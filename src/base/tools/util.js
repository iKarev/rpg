import { http } from 'core'

const _ = {
  delay(ms = 10) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, ms);
    })
  },

  isUndefined(d) {
    return typeof d === 'undefined'
  },

  isEmpty(els) {
    return els.length && els.length === 0
  },

  isNull(d) {
    return d === null
  },
  isString(d) {
    return typeof d === 'string'
  },

  get(value, path) {
    for (const prop of path.split('.'))
      if (value[prop])
        value = value[prop]
      else return undefined
    return value
  },

  getParent(target, className) {
    while (!target.hasClass(className))
      target = target.parent()
    return target
  },

  string(obj) {
    return JSON.stringify(obj)
  },

  addListener(obj, callback) {
    return new Proxy(obj, {
      set: (target, key, value) => {
        console.log(target, key, value)
        target[key] = value
        callback()
        return target[key]
      }
    })
  }
}

export { _ }