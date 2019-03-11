import { RPGComponent, _, $ } from "core";

class TabsComponent extends RPGComponent {
  
  constructor(config) {
    super(config)
    this.data = {
      titles: '',
      exit: '',
      active: ''
    }
    this.index = 0

    // this.tabs = config.tabs
  }

  onInit() {
    this.fit(this.props)
    if (!this.data.tabs) return

    const { titles, templates } = setTabs(this.data.tabs)
    this.templates = templates

    this.updateData({
      titles,
      active: this.templates[0]
    })
  }

  events() {
    return {
      'click .rpg-tabs-tab-title': 'onTabCLick'
    }
  }

  onTabCLick({ target }) {
    const $target = $(target)
    const index = _.get($target, 'nativeElement.dataset.index')
    if (index === this.index)
      return

    const revert = this.index < index ? 'revert' : ''
    this.index = index

    this.updateData({
      revert,
      exit: this.data.active,
      active: this.templates[index]
    })

    _.history.path(this.data.tabs[index].name)
    const titles = this.el.findAll('.rpg-tabs-tab-title')
    titles.forEach(node => {
      node.removeClass('active')
    });
    titles[index].addClass('active')
  }
}

export const rpgTabs = new TabsComponent({
  selector: 'rpg-tabs',
  template: /*html*/`
  <div class="mt_20">
    <div class="">
      <ul class="rpg-tabs header layout-row">
        {{ titles }}
      </ul>
      <div class="rpg-tabs-content">
        <section class="rpg-tabs-content-active {{ revert }} ph_20">
          {{ active }}
        </section>
        <section class="rpg-tabs-content-exit {{ revert }} ph_20">
          {{ exit }}
        </section>
      </div>
    </div>
  </div>
  `
})

function setTabs(tabs) {
  let titles = ''
  const templates = []
  for (const [i, item] of tabs.entries()) {
    titles += makeTitle(item.title, i)
    templates.push(item.template)
  }
  return { titles, templates }
}

function makeTitle(title, num) {
  return /*html*/`
    <div
      data-index="${num}"
      class="${num === 0 ? 'active' : ''} flex ta-c pv_8 ph_16 rpg-tabs-tab-title"
    >
      ${title}
    </div>
  `
}