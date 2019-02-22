import { renderComponent } from "./render"

export function initComponents (bootstrapComponent, components) {
  bootstrapComponent.render()
  components.forEach(renderComponent)
}