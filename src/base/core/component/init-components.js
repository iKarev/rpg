import { renderComponent } from "./render"

export function initComponents (bootstrapComponent, components) {
  bootstrapComponent.render(components)
  components.forEach((c) => renderComponent(c, components))
}