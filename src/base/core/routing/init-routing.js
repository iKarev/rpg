import { _ } from 'core'
import { RoutingModule } from "./index"

export function initRouting (routes, dispatcher, components) {
  if (_.isUndefined(routes))
    return
  
  let routing = new RoutingModule(routes, dispatcher, components)
  routing.init()
}