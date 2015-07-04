let cascade = function (funcs, ...args) {
    return Promise.resolve(funcs.length ? funcs.shift()(...args) : args[0]).then((...newArgs) => {
        return funcs.length ? cascade(funcs, ...(newArgs || args)) : newArgs[0] || args[0];
    });
};

export default class Goo{
  constructor(doFunction){
    this.doFunction = doFunction;
    this.events = {};
  }
  on (eventName, eventHandler) {
      if (this.events[eventName] === undefined) {
          this.events[eventName] = [];
      }
      return this.events[eventName].push(eventHandler.bind(this));
  }
  trigger (eventName, eventData) {
      if (this.events[eventName] === undefined) {
          this.events[eventName] = [];
      }
      return cascade(this.events[eventName], eventData);
  }
  before(beforeFunction) {
      return this.on('beforeDo', beforeFunction);
  }
  after(afterFunction) {
      return this.on('afterDo', afterFunction);
  }
  do(...args) {
    let funcs = [this.trigger.bind(this, 'beforeDo'), this.doFunction, this.trigger.bind(this, 'afterDo')];
    return cascade(funcs, ...args);
  }
}
