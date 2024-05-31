
/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
  // your code here
  function throttlePromises(funcs, max){
   return new Promise((resolve, reject) => {
    let concurrentCount = 0
    let latestCalledFuncIndex = -1
    let resultCount = 0
    let hasError = false
    const result = []

    const fetchNext = () => {
      // already done
      if (hasError || latestCalledFuncIndex === funcs.length - 1) {
        return
      }
      // get the func
      // trigger
      // update the count
      // if ok for next fetch, trigger next

      const nextFuncIndex = latestCalledFuncIndex + 1
      const next = funcs[nextFuncIndex]

      concurrentCount += 1
      latestCalledFuncIndex += 1

      next().then((data) => {
        result[nextFuncIndex] = data
        resultCount += 1
        concurrentCount -= 1

        if (resultCount === funcs.length) {
          resolve(result)
          return
        }

        fetchNext()
      }, (err) => {
        hasError = true
        reject(err)
      })
      
      if (concurrentCount < max) {
        fetchNext()
      }
    }

    fetchNext()
  })
 }
 

const t1 = () => new Promise(res => setTimeout(() => res('t1'), 3000))
const t2 = () => new Promise(res => setTimeout(() => res('t2'), 200))
const t3 = () => new Promise(res => setTimeout(() => res('t3'), 1500))
const t4 = () => new Promise(res => setTimeout(() => res('t4'), 5000))
const t5 = () => new Promise(res => setTimeout(() => res('t5'), 4200))
const t6 = () => new Promise(res => setTimeout(() => res('t6'), 1000))


const tasks = [t1, t2, t3, t4, t5, t6];


throttlePromises(tasks, 2).then((res)=> console.log(res));
