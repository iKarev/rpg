import { _ } from "../tools/util";
import { initDirectives } from './directives/init-directives'
import { EventEmitter } from "../tools/event-emitter";
import { initComponents } from "./component/init-components"
import { initRouting } from "./routing/init-routing"

export class Module {
  constructor(config) {
    this.components = config.components
    this.directives = config.directives
    this.bootstrapComponent = config.bootstrap
    this.routes = config.routes

    this.dispatcher = new EventEmitter()
  }

  start() {
    initComponents(this.bootstrapComponent, this.components)
    initRouting(this.routes, this.dispatcher)
    initDirectives(this.directives)

    this.dispatcher.on('routing.change-page', () => initDirectives(this.directives))
    this.dispatcher.on('rendered', () => initDirectives(this.directives))
  }
}

