import { RPGComponent, $ } from "core";

class TabsPage extends RPGComponent {
  constructor(config) {
    super(config)
  }

  events() {
    return {
      'click .collapsible': 'onTabCLick'
    }
  }

  onTabCLick({ target }) {
    if (!target.classList.contains('collapsible-header'))
      return

    let $target = $(target)


    const needClose = target.parentNode.classList.contains('active')
    this.el.findAll('.rpg-tab').forEach(node => {
      node.removeClass('active')
    });
    if (!needClose)
      $target.parent().addClass('active')
  }
}

export const tabsPage = new TabsPage({
  selector: 'rpg-tabs-page',
  template: /*html*/`
  <div class="row" style="margin-top: 20px;">
    <div class="col s6 offset-s3">
      <ul class="collapsible popout">
        <li class="rpg-tab">
          <div class="collapsible-header"><i class="material-icons">delete</i> First</div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.</span>
          </div>
        </li>
        <li class="rpg-tab">
          <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.</span>
          </div>
        </li>
        <li class="active rpg-tab">
          <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  `
})