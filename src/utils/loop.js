// @flow

export default function Loop() {
  this.handlers = []

  const tick = () => {
    this.handlers.forEach(handler => handler())
    this.request = window.requestAnimationFrame(tick)
  }

  window.requestAnimationFrame(tick)
}

Loop.prototype.subscribe = function (callback) {
  this.handlers.push(callback)
}

Loop.prototype.unsubscribe = function (callback) {
  this.handlers.filter(handler => handler !== callback)
}

Loop.prototype.stop = function() {
  this.handlers.forEach(handler => this.unsubscribe(handler))
  window.cancelAnimationFrame(this.request)
}
