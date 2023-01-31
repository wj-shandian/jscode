class Event {
  constructor() {
    this.callbacks = {};
  }
  on(name, fn) {
    if (this.callbacks[name]) {
      this.callbacks[name].push(fn);
    } else {
      this.callbacks[name] = [fn];
    }
  }
  emit(name, args) {
    let cbs = this.callbacks[name];
    if (cbs) {
      cbs.foreach((item) => {
        item.apply(this, args);
      });
    }
  }
  off(name) {
    this.callbacks[name] = null;
  }
}
