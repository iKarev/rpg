import { _, $ } from "core";
import { router } from "./router";
import { renderComponent } from "../component/render"
import { dispatch } from '../../tools/event-emitter'

import { regexpRouteParam } from '../../tools/regexp'

export class RoutingModule {
  constructor(routes, dispatcher, components) {
    this.routes = routes
    this.dispatcher = dispatcher
    this.components = components
  }

  init() {
    window.addEventListener('hashchange', renderRoute.bind(this, this.dispatcher))
    renderRoute.call(this, this.dispatcher)
  }
}

function renderRoute(dispatcher) {

  const route = getParams.call(this)

  if (_.isUndefined(route))
    route = this.routes.find(r => r.path === '**')

  $('router-outlet').html(`<${route.component.selector}></${route.component.selector}>`)
  route.component.dispatcher = dispatcher
  route.component.dispatch = dispatch.bind(route.component)

  renderComponent(route.component, [...this.routes.map(r => r.component), ...this.components])

  this.dispatcher.emit('routing.change-page')
}

function getParams() {
  const url = router.getUrl() // Получаем Url
  const urlParts = url.split('/') // Разбиваем на части по слэшу
  const section = this.routes.filter(r => r.path.match(`${urlParts[0]}`)) // Смотрим, совпадает ли начало url с каким-нибудь роутом

  let route = section.find(r => r.path === url)
  if (!route) {
    let param
    route = section.find(r => {
      if (r.path.match(regexpRouteParam)) {
        param = r.path.match(regexpRouteParam)
        return true
      }
    })
    if (route && param)
      route.component.params = {[param[0].slice(2)]: urlParts[1]}
  }
  return route
}
