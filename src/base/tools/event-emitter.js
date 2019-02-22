import { _ } from 'core'

export class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(eventName, func) {
    if (_.isUndefined(this.listeners[eventName])) this.listeners[eventName] = []

    this.listeners[eventName].push(func)
  }

  emit(eventName, data) {
    if (_.isUndefined(this.listeners[eventName])) return

    this.listeners[eventName].forEach(f => f(data))
  }

}

export function dispatch(event, el, query, data) {
  switch (event) {
    case 'dom.change-attr':
      el.attr(query, data)
      break
  }
  // this.dispatcher.emit(event)
}