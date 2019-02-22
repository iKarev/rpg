import { _, $ } from 'core'

export class Directive {
  constructor(config) {
    this.selector = config.selector
    this.onInit = config.onInit
  }

  init() {
    let els = $('body').findAll(this.selector)
    if (!_.isUndefined(this.onInit) && !_.isEmpty(els)) {
      els.forEach(el => {
        this.onInit(el, getParamValue(el, this.selector))
      })
    }
  }
}

function getParamValue(el, selector) {
  return el.attr(selector.slice(1).slice(0, selector.length - 2))
}
