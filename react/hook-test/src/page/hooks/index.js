import React, { useState, useEffect, useContext, useRef } from 'react';
import { stateContext } from '../../App';

const sleep = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time || 500)
})

// https://juejin.im/post/5cb5705ee51d456e6e38921d#heading-18
function Example(props, context) {
   // 声明一个名为 count 的新状态变量
   // react规定必须把hooks写在函数的最外层，不能写在ifelse等条件语句当中，来确保hooks的执行顺序一致
   const [count, setCount] = useState(0);
   // 第二个参数 setCount 为一个可以更新状态的函数
   // useState 的参数即为初始值

   // 类似于 componentDidMount 和 componentDidUpdate
    // 在 useEffect 中可以使用组建的 state 和 props
    // 在每次渲染后都执行 useEffect
    useEffect(() => {
      console.log(`You have clicked ${count} times`);
      // 函数的返回值相当于componentWillUnmount
      return () => {
        console.log(`You have clicked ${count} times - end`);
      }
  }, [count])
  // 这里的useEffect的第二个参数必须传空数组，这样它就等价于只在componentDidMount的时候执行。
  // 如果不传第二个参数的话，它就等价于componentDidMount和componentDidUpdate
  const initData = async () => {
    // 发起请求并执行初始化操作
    await sleep(2000);
    console.log('fetch end');
  }
  useEffect(() => {
    initData();
  }, []);

  // useContext
  const value = useContext(stateContext);
  console.log(value);

  let pRef = useRef(null);
  useEffect(() => {
      console.log(pRef.current);
  })

  return (
    <div>
      <p ref={pRef}>use {count} times</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;
