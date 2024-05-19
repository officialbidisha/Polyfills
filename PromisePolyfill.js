const STATE = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};

class MyPromise {
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailureBind = this.#onFailure.bind(this);
  #state = STATE.PENDING;
  #value = null;
  #thenCbs = [];
  #catchCbs = [];

  constructor(callback) {
    try {
      callback(this.#onSuccessBind, this.#onFailureBind);
    } catch (e) {
      this.#onFailure(e);
    }
  }

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return;
    queueMicrotask(() => {
      /**
       * In case the callback or promise depends on resolving
       * another promise
       */
      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailureBind);
        return;
      }

      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    });
  }
  #onFailure(value) {
    if (this.#state !== STATE.PENDING) return;
    queueMicrotask(() => {
      /**
       * In case the value is a promise. we want to first
       * want this value to resolve then we want to run the
       * next promise
       */
      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailureBind);
        return;
      }
      if (this.#catchCbs.length === 0) {
        throw new UncaughtPromiseError(value);
      }
      this.#value = value;
      this.#state = STATE.REJECTED;
      this.#runCallbacks();
    });
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((callback) => {
        callback(this.#value);
      });
      this.#thenCbs = [];
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((callback) => {
        callback(this.#value);
      });
      this.#catchCbs = [];
    }
  }

  then(thenCb, catchCb) {
    return new Promise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        console.log("RESULT", result);
        if (thenCb === null) {
          resolve(result);
          return;
        }
        try {
          let res = thenCb(result);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });

      this.#catchCbs.push((result) => {
        console.log("RESULT", result);
        if (catchCb === null) {
          reject(result);
          return;
        }
        try {
          let res = catchCb(result);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
      this.#runCallbacks();
    });
  }
  catch(cb) {
    return this.then(undefined, cb);
  }
  finally(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        return result;
      }
    );
  }
  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);
    this.stack = `(in promise) ${error.stack}`;
  }
}

let pro = new MyPromise((resolve, reject) => {
  resolve(200);
});

pro
  .then((res) => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject(res + 40);
      }, 200);
    });
  })
  .then((r) => console.log("Hey", r))

  .catch((err) => console.error(err));
