import { RPGInfo } from "../../components/info.component"

class RPGGeography extends RPGInfo {
  constructor(config) {
    super(config)
    this.data = {
      color1: 'red',
      color2: 'blue'
    }
  }

  events() {
    return {
      'click .change-color': 'changeColor'
    }
  }

  changeColor() {
    this.data.color1 = this.data.color1 === 'red' ? 'blue' : 'red'
  }

}

export const rpgInfoGeography = new RPGGeography({
  selector: 'rpg-world-geography',
  template: /*html*/`
    <h1 class="hover" appHover="{{ color1 }}">География</h1>
    <button type="button" class="change-color">Change Color 1</button>
    <h1 class="hover" appHover="{{ color2 }}">География</h1>
    <button type="button" class="change-color">Change Color 2</button>
  `
})