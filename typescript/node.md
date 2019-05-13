## tip

### 类型定义

``` javascript
// input e
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value, e);
  };

// 无状态组件
import { SFC } from 'react'
import { MouseEvent } from 'react'
import * as React from 'react'
interface IProps {
  onClick (event: MouseEvent<HTMLDivElement>): void,
}
const Button: SFC<IProps> = ({onClick, children}) => {
  return (
    <div onClick={onClick}>
      { children }
    </div>
  )
}
export default Button

// promise

interface IResponse<T> {
  message: string,
  result: T,
  success: boolean,
}
async function getResponse (): Promise<IResponse<number[]>> {
  return {
    message: '获取成功',
    result: [1, 2, 3],
    success: true,
  }
}
getResponse()
  .then(response => {
    console.log(response.result)
  })

// 使用 Partial 将所有的 props 属性都变为可选值
// type Partial<T> = { [P in keyof T]?: T[P] };
// 使用 Required 将所有 props 属性都设为必填项
// type Required<T> = { [P in keyof T]-?: T[P] };

import { MouseEvent } from 'react'
import * as React from 'react'
interface IProps {
  color: 'red' | 'blue' | 'yellow',
  onClick (event: MouseEvent<HTMLDivElement>): void,
}
const Button: SFC<Partial<IProps>> = ({onClick, children, color}) => {
  return (
    <div onClick={onClick}>
      { children }
    </div>
  )

// 从 T 中取出一系列 K 的属性
// type Pick<T, K extends keyof T> = {
//    [P in K]: T[P];
// };

interface Person {
  name: string,
  age: number,
  sex: string,
}
let person: Pick<Person, 'name' | 'age'> = {
  name: '小王',
  age: 21,
}

// 将 K 中所有的属性的值转化为 T 类型。
// type Record<K extends keyof any, T> = {
//    [P in K]: T;
// };

// 从对象 T 中排除 key 是 K 的属性。
// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

interface Person {
  name: string,
  age: number,
  sex: string,
}
let person: Omit<Person, 'name'> = {
  age: 1,
  sex: '男'
}

// NonNullable <T> 排除 T 为 null 、undefined。
// type NonNullable<T> = T extends null | undefined ? never : T;

type T = NonNullable<string | string[] | null | undefined>; // string | string[]

// 获取函数 T 返回值的类型。。
// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

type T1 = ReturnType<() => string>; // string
type T2 = ReturnType<(s: string) => void>; // void

// 在TypeScript / JSX中向现有HTML元素添加属性？
declare module 'react' {
  interface HTMLAttributes<T> {
    readonly foo?: 'bar' | 'baz';
  }
}

// typeof
export const tuple = <T extends string[]>(...args: T) => args;
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];




```
