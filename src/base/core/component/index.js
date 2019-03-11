import { _, $ } from "core";
import { renderComponent } from "./render"
import { regexpChildren, regexpChildrenName, regexpChildrenProps, regexpData } from '../../tools/regexp'

export class Component {
  constructor(config) {
    this.template = config.template
    this.selector = config.selector
    this.components = []
    this.el = null
    this.params = null
    this.dataListenerEnabled = false
  }

  render(components) {
    this.el = $(this.selector)
    this.components = components

    if (!this.el)
      throw new Error(`Component with selector ${this.selector} wasn't found`)

    if (!this.el.nativeElement)
      return

    const compiledTemplate = compileTemplate(this.template, this.data)
    this.el.html(compiledTemplate)

    initEvents.call(this)

    initChildren.call(this, compiledTemplate)

    if (!_.isUndefined(this.dispatcher))
      this.dispatcher.emit('rendered')
    
    if (!this.dataListenerEnabled) {
      this.listenForChanges()
    }
  }

  fit(data) {
    data = {...this.data, ...data}
    this.data = _.addListener(data, this.render.bind(this, this.components))
    this.render(this.components)
  }

  listenForChanges() {
    if (!_.isUndefined(this.data)) {
      this.dataListenerEnabled = true
      this.data = _.addListener(this.data, this.render.bind(this, this.components))
    }
  }

  updateData(newData) {
    this.data = _.addListener({...this.data, ...newData}, this.render.bind(this, this.components))
    this.render(this.components)
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

function initChildren(compiledTemplate) {
  let matches = compiledTemplate.match(regexpChildren)
  if (!matches)
    return

  matches = matches.map(r => {
    const propsMatches = r.match(regexpChildrenProps)
    const props = {}
    if (propsMatches && propsMatches.length) {
      for (const prop of propsMatches) {
        const parts = prop.split(']="')
        props[parts[0].slice(1)] = this.data[parts[1].slice(0, parts[1].length - 1)]
      }
    }
    return {
      selector: r.match(regexpChildrenName)[0].slice(1).slice(0, -1),
      props
    }
  })
  const children = matches.reduce(reduceChildrenMatches.bind(this), [])
  children.forEach(c => renderComponent(c, this.components))

  function reduceChildrenMatches(acc, match) {
    const component = this.components.find(c => match.selector === c.selector)
    if (component) {
      component.props = match.props
      acc.push(component)
    }
    return acc
  }
}


function compileTemplate(template, data) {
  if (!_.isUndefined(data)) {

    const regexp = regexpData
    template = template.replace(regexp, (str, d) => _.get(data, d.trim()) || '')
  }

  return template
}
