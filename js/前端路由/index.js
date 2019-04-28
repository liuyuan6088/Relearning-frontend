// 前端路由的两种实现原理

// 1. Hash模式
// window对象提供了onhashchange事件来监听hash值的改变,一旦url中的hash值发生改变,便会触发该事件。
// 2. History 模式
// HTML5的History API 为浏览器的全局history对象增加的扩展方法。
// window对象提供了onpopstate事件来监听历史栈的改变,一旦历史栈信息发生改变,便会触发该事件。
// 需要特别注意的是,调用history.pushState()或history.replaceState()不会触发popstate事件。只有在做出浏览器动作时，才会触发该事件。


import HashRouter from './hash';
import HistoryRouter from './history';
//路由模式
const MODE = 'hash'; 
const ROUTELIST = [
  {
    path: '/',
    name: 'index',
    component: 'This is index page'
  },
  {
    path: '/hash',
    name: 'hash',
    component: 'This is hash page'
  },
  {
    path: '/history',
    name: 'history',
    component: 'This is history page'
  },
  {
    path: '*',
    name: 'notFound',
    component: '404 NOT FOUND'
  }
];

class WebRouter {
  constructor({ mode = 'hash', routeList }) {
    this.router = mode === 'hash' ? new HashRouter(routeList) : new HistoryRouter(routeList);
  }
  push(path) {
    this.router.push(path);
  }
  replace(path) {
    this.router.replace(path);
  }
  go(num) {
    this.router.go(num);
  }
}

export const webRouter = new WebRouter({
  mode: MODE,
  routeList: ROUTELIST
});
