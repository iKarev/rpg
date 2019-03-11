import { RPGComponent, router, http } from "core";

class HomePage extends RPGComponent {
  constructor(config) {
    super(config)

    this.data = {
      title: `Main Card`,
      linkTitle: 'another page'
    }
  }

  events() {
    return {
      'click .rpg-change-text': 'changeText',
      'click .rpg-link': 'goToTabs'
    }
  }

  changeText() {
    this.data.linkTitle = this.data.linkTitle === 'another page'
      ? 'this page'
      : 'another page'
    this.render(this.components)
  }

  goToTabs(e) {
    e.preventDefault()
    router.navigate('tabs')
  }
}

export const homePage = new HomePage({
  selector: 'rpg-home-page',
  template: /*html*/`
  <div class="row">
    <div class="col s6 offset-s3" style="margin-top: 20px;">
      <div class="card">
        <div class="card-content">
          <span class="card-title">{{ title }}</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action layout-row layout-align-space-between-center">
          <a title="{{ linkTitle }}" class="rpg-link">Go to {{ linkTitle }}</a>
          <button class="rpg-change-text">Change text</button>
        </div>
      </div>
    </div>
  </div>
  `
})