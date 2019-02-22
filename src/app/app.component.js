import { RPGComponent } from "core";

class AppComponent extends RPGComponent {
  constructor(config) {
    super(config)
  }
}

export const rpgComponent = new AppComponent({
  selector: 'rpg-root',
  template: /*html*/`
    <rpg-header></rpg-header>

    <div class="row m_0">
      <div class="col s10 offset-s1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})