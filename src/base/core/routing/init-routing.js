import { _ } from 'core'
import { RoutingModule } from "./index"

export function initRouting (routes, dispatcher) {
  if (_.isUndefined(routes))
    return
  
  let routing = new RoutingModule(routes, dispatcher)
  routing.init()
}