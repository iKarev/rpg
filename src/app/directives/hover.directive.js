import { RPGDirective } from "core";

class RGPHoverDirecitve extends RPGDirective {
  constructor(config) {
    super(config)
  }
}

export const hoverDirecitve = new RGPHoverDirecitve({
  selector: '[appHover]',
  onInit(el, color = 'blue') {
    const defaultColor = el.css().color
    el.on('mouseenter', () => el.css({color}))
    el.on('mouseleave', () => el.css({color: defaultColor}))
  }
})
