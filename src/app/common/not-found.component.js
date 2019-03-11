import { RPGComponent } from "core";

class NotFound extends RPGComponent {
  constructor(config) {
    super(config)
  }
}

export const notFound = new NotFound({
  selector: 'rpg-not-found',
  template: /*html*/`
    <div class="center">
      <h2>404 Page not found</h2>
      <a href="#">На главную</a>
    </div>
  `
})