/**
 * 缓存函数计算结果
 */
function computed(str) {
  // 假设中间的计算非常耗时
  console.log('2000s have passed')
  return 'a result'
}
function cached(fn){
  const cache = Object.create(null)
  return function cachedFn (str) {
    if ( !cache[str] ) {
        cache[str] = fn(str)
    }
    return cache[str]
  }
}

// var cachedComputed = cached(computed)
// cachedComputed('ss')
// // 打印2000s have passed
// cachedComputed('ss')
// // 不再打印


/**
 * 将hello-world风格的转化为helloWorld风格
 */
const camelizeRE = /-(\w)/g
const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

// camelize('hello-world') // "helloWorld"

const deepClone = (obj) => {
  let objClone = Array.isArray(obj) ? [] : {};
  if(obj && typeof obj === "object") {
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        // 判断 obj 子元素是否为对象，如果是，递归复制
        if(obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}