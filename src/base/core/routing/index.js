import { _, $ } from "core";
import { router } from "./router";
import { renderComponent } from "../component/render"
import { dispatch } from '../../tools/event-emitter'

export class RoutingModule {
  constructor(routes, dispatcher) {
    this.routes = routes
    this.dispatcher = dispatcher
  }

  init() {
    window.addEventListener('hashchange', renderRoute.bind(this, this.dispatcher))
    renderRoute.call(this, this.dispatcher)
  }
}

function renderRoute(dispatcher) {
  const url = router.getUrl()
  let route = this.routes.find(r => r.path === url)

  if (_.isUndefined(route)) {
    route = this.routes.find(r => r.path === '**')
  }

  $('router-outlet').html(`<${route.component.selector}></${route.component.selector}>`)
  route.component.dispatcher = dispatcher
  route.component.dispatch = dispatch.bind(route.component)
  renderComponent(route.component)

  this.dispatcher.emit('routing.change-page')
}