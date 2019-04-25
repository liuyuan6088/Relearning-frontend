// curry
// 函数柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数而且返回结果的新函数的技术。

// compose
// 合成多个函数，react-redux里使用compose用于争强store，依次执行各个插件

function curry(fn, args = []) {
  return function(){
      let rest = [...args, ...arguments];
      if (rest.length < fn.length) {
          return curry.call(this,fn,rest);
      }else{
          return fn.apply(this,rest);
      }
  }
}
const curry = (fn, args = []) => {
  return (...rest) => {
    const params = [...args, ...rest];
    return params.length < fn.length ? curry.call(this,fn,params) : fn.apply(this,rest);
  }
}

const compose = fns => {
  if (!fns) return () => {};
  if (fns.length === 1) return fns[0];
  return fns.reduceRight((a,b) => (...args) => (b(a(...args))));
}