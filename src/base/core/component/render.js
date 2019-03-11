import { _ } from "core";

export function renderComponent(c, components) {
  if (!_.isUndefined(c.onInit)) c.onInit()

  c.render(components)

  if (!_.isUndefined(c.afterInit)) {
    c.afterInit()
  }
}
