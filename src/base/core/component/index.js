import { _, $ } from "core";
import { compileFunction } from "vm";

export class Component {
  constructor(config) {
    this.template = config.template
    this.selector = config.selector
    this.el = null
    this.dataListenerEnabled = false
  }

  render() {
    this.el = $(this.selector)
    if (!this.el)
      throw new Error(`Component with selector ${this.selector} wasn't found`)

    this.el.html(compileTemplate(this.template, this.data))

    initEvents.call(this)

    if (!_.isUndefined(this.dispatcher))
      this.dispatcher.emit('rendered')
    
    if (!this.dataListenerEnabled) {
      this.listenForChanges()
    }
  }

  setComputed(prop, value) {
    console.log(this.data[prop])
    console.log(value)
    this.data[prop] = value
    this.render()
  }

  listenForChanges() {
    if (!_.isUndefined(this.data)) {
      this.dataListenerEnabled = true
      this.data = _.addListener(this.data, this.render.bind(this))
    }
  }

}

function initEvents() {
  if (_.isUndefined(this.events))
    return

  let events = this.events()
  
  Object.keys(events).forEach(key => {
    let listener = key.split(' ')
    const res = this.el
      .findAll(listener[1])
      .forEach(node => node.on(listener[0], this[events[key]].bind(this)))
  })
}

function compileTemplate(template, data) {
  if (!_.isUndefined(data)) {
   
    const regexp = /\{{(.*?)}\}/g
    template = template.replace(regexp, (str, d) => data[d.trim()])
  }

  return template
}
