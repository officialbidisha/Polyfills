function throttlePromises(funcs, max) {
  return new Promise((resolve, reject) => {
    let index = 0
    let result = []
    let activePromises = 0

    const next = () => {
      if (index >= funcs.length && activePromises === 0) {
        resolve(result)
        return
      }

      if (activePromises < max && index < funcs.length) {
        const currentIndex = index
        const func = funcs[index]

        activePromises++
        index++

        func().then(
          (data) => {
            result[currentIndex] = data
            activePromises--
            next()
          },
          (err) => {
            reject(err)
          }
        )
        
        next()
      }
    }

    next()
  })
}
