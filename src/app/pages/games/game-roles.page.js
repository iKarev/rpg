import { RPGComponent, $, _ } from "core"
import { gameService } from "../../services/game.service"
import { tabsNames } from "../../helpers/arrays";

class GameRoles extends RPGComponent {
  constructor(config) {
    super(config)
    this.list = [{
      title: 'Хронология событий',
      template: '<h3>Хронология</h3>',
      category: 3,
    },{
      title: 'Оферта',
      template: '<h3>Оферта</h3>',
      category: 2,
    },{
      title: 'Культ',
      template: '<h3>Культ</h3>',
      category: 1,
    }]
    this.active = null
    this.data = {
      list: [],
      show: '',
      role: {
        content: '',
        title: '',
        category: null,
        sign: ''
      }
    }
  }

  onInit() {
    this.fit(this.props)
    if (!this.data.gameId) return

    gameService.getGameRoles(this.data.gameId)
      .then(list => {
        this.list = list
        this.updateData({ list: mapList(list) })
      })
  }

  events() {
    return {
      "click .rpg-roles-show-item": "showRole",
      "click .rpg-add-role": "addRole",
      "click .cancel-editing": "toList",
      "click .back-to-item": "back",
      "click .rpg-edit-role": "editRole",
      "click .back-to-list": "toList",
      "submit .rpg-roles-tab-edit": "editRoleSubmit",
    }
  }

  editRoleSubmit(e) {
    e.preventDefault()

    const data = $(e.target).formData()
    data.gameId = this.data.gameId

    let role = this.list[this.active]
    const id = role ? role._id : null

    gameService.editRole(data, id)
      .then(createdRole => {
        const dataToUpdate = { show: data.template }
        if (!id) {
          this.list.push(createdRole)
          dataToUpdate.active = this.list.length - 1
          dataToUpdate.list = mapList(this.list)
        } else {
          role = {_id: role._id, ...data}
          this.list[this.active] = role
        }
        this.updateData(dataToUpdate)
        this.back()
      })
  }

  showRole(e) {
    if (e) {
      const $target = $(e.target)
      const index = _.get($target, 'nativeElement.dataset.index')
      this.active = index
      if (!this.list[index].template)
        gameService.getRolesItem(this.list[index]._id)
          .then(role => {
            this.list[index] = role
            this.updateData({ show: role.template })
            this.back()
          })
      else {
        this.updateData({ show: this.list[index].template })
        this.back()
      }
    }
  }
  editRole() {
    this.updateData({ role: this.list[this.active] })
    this.toEdit()
  }
  addRole() {
    this.updateData({ role: this.emptyRole })
    this.toEdit()
  }

  toEdit() {
    this.setActive('$edit')
  }
  back() {
    if (_.isNull(this.active)) {
      return this.toList()
    }
    this.setActive('$show')
  }
  toList() {
    this.active = null
    this.setActive('$list')
  }
  setActive(active) {
    for (const tab of tabsNames) this[tab].removeClass('active')
    this[active].addClass('active')
  }


  get $show() {
    return this.el.find('.rpg-roles-tab-show')
  }
  get $edit() {
    return this.el.find('.rpg-roles-tab-edit')
  }
  get $list() {
    return this.el.find('.rpg-roles-tab-list')
  }
  get emptyRole() {
    return {
      content: '',
      title: '',
      category: null,
      sign: ''
    }
  }

}

export const rpgGameRoles = new GameRoles({
  selector: 'rpg-game-roles',
  template: /*html*/`
  <div class="layout-row layout-align-center-center relative">
    <div data-index="1" class="w_100 rpg-roles-tab active rpg-roles-tab-list">
      {{ list }}
      <div class="absolute top0 right4">
        <a class="rpg-add-role btn-floating waves-effect waves-light blue">
          <i class="material-icons">add</i>
        </a>
      </div>
    </div>
    <div data-index="2" class="w_100 rpg-roles-tab rpg-roles-tab-show">
      {{ show }}
      <!-- <rpg-game-roles-info></rpg-game-roles-info> -->
      <section class="layout-row layout-align-end-center">
        <button type="button" class="btn grey mv_12 back-to-list">
          Назад <i class="material-icons right">keyboard_backspace</i>
        </button>
      </section>
      <div class="absolute top0 right4">
        <a class="rpg-edit-role btn-floating waves-effect waves-light blue">
          <i class="material-icons">edit</i>
        </a>
      </div>
    </div>
    <form data-index="3" class="w_100 rpg-roles-tab rpg-roles-tab-edit">
      <section class="w_100 field layout-column">
        <section class="w_100 field layout-row">
          <div class="pr_12 flex_70">
            <input id="title" type="text" value="{{ role.title }}">
            <label class="static" for="title">Название</label>
          </div>
          <div class="pl_12 flex_30">
            <input id="sign" type="text" value="{{ role.sign }}">
            <label class="static" for="sign">Знак</label>
          </div>
        </section>
        <textarea class="materialize-textarea article-edit" id="template">
          {{ role.template }}
        </textarea>
        <label class="static" for="template">Описание</label>
      </section>
      <section class="layout-row layout-align-space-between-center">
        <button type="submit" class="btn blue lighten-2 mv_12">
          Сохранить <i class="material-icons right">check</i>
        </button>
        <button type="button" class="btn grey mv_12 back-to-item">
          Отмена <i class="material-icons right">clear</i>
        </button>
      </section>
    </form>
  </div>
  `
})

function mapList(list) {
  let items = ''
  for (const [i, item] of list.entries())
    items += /*html*/`
      <li>
        <a data-index="${i}" class="rpg-roles-show-item">
          ${item.title}
        </a>
      </li>
    `
  return /*html*/`
    <ul class="rpg-roles-list">
      ${items.length ? items : 'Для этой игры пока не добавлено ни одной роли'}
    </ul>
  `
}
