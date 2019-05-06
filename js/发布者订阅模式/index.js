

class Observes {

  constructor() {
    this.list = {};
  }

  on(type, fn) {
    if (!this.list[type]) {
      this.list[type] = [];
    }
    this.list[type].push(fn);
  }

  emit(type, ...rest) {
    if (!this.list[type]) {
      throw new Error('错误参数')
    }
    const fns = this.list[type];
    if (fns.length === 0) return false;
    fns.forEach(e => e.apply(this, rest));
  }

  remove(type, fn) {
    if (!this.list[type]) {
      throw new Error('错误参数')
    }
    if (!fn) this.list[type] = [];
    this.list[type] = this.list[type].filter(e => e !== fn);
  }
}

const observerable = new Observes();
observerable.on('log', () => { console.log('0') });
observerable.on('log', () => { console.log('1') });
observerable.on('log', () => { console.log('2') });
observerable.emit('log');
observerable.remove('log');
observerable.emit('log');
