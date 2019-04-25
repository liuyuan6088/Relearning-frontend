
// 实现 call apply bind 函数
// 以上三个方法均可以改变this的指向
// call apply使用基本差不多，都是立即执行，返回执行结果，唯一的区别在于第二个参数：
// call(context, param1, param2, .....) apply(context, [param1, param2, .....])
// bind则是不会立即执行，返回改变this后的方法

var a = 1;

const obj = {
  a: 2,
  name: 'lisa'
}

const textFn = function() {
  console.log(this.a, [...arguments])
}
textFn(); // 1, []

hasFn = obj => {
  const random = `fn_${Math.random()}`;
  if (obj.hasOwnProperty(random)) {
      return mySymbol(obj)
  } else {
      return random
  }
}

/** 
 * @param context - 要替换的this指向
*/
Function.prototype._call = function(context) {
  context = context || window;
  const fn = hasFn(context);
  context[fn] = this; // 给context添加一个方法 指向this
  const args = [...arguments].slice(1); // 截取参数
  const result = context[fn](...args);
  delete context[fn];
  return result;
}

textFn._call(obj, 1, 2); // 2, [1, 2]

/** 
 * @param context - 要替换的this指向
*/
Function.prototype._apply = function(context) {
  context = context || window;
  const fn = hasFn(context);
  context[fn] = this;
  const arg = [...arguments].slice(1,2); //[...xxx]把类数组变成数组
  const params = Array.isArray(arg[0]) ? arg[0] : [arg[0]];
  const result = context[fn](...params);
  delete context[fn];
  return result;
}

textFn._apply(obj, [1, 2]); // 2, [1, 2]

/** 
 * @param context - 要替换的this指向
*/
Function.prototype._bind = function(context) {
  context = context || window;
  const self = this;
  const args = [...arguments].slice(1);
  const fn = function() {
    const _this = this instanceof self ? this : context; // 考虑是构造函数的情况
    self._apply(_this, [...args, ...arguments])
  }
  const noop = function() {}
  if (self.prototype) {
    noop.prototype = self.prototype;
  }
  fn.prototype = new noop(); // new 不丢失原型
  return fn;
}

const newTextFn = textFn._bind(obj, 1, 2);
newTextFn(); // 2, [1, 2]
