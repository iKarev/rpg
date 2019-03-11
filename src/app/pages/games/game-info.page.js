import { RPGComponent, $, _ } from "core"
import { gameService } from "../../services/game.service"
import { tabsNames } from '../../helpers/arrays'

class GameInfo extends RPGComponent {
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
      info: {
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

    gameService.getGameInfo(this.data.gameId)
      .then(list => {
        this.list = list
        this.updateData({ list: mapList(list) })
      })
  }

  events() {
    return {
      "click .rpg-info-show-item": "showInfo",
      "click .rpg-add-info": "addInfo",
      "click .cancel-editing": "toList",
      "click .back-to-item": "back",
      "click .rpg-edit-info": "editInfo",
      "click .back-to-list": "toList",
      "submit .rpg-info-tab-edit": "editInfoSubmit",
    }
  }

  editInfoSubmit(e) {
    e.preventDefault()

    const data = $(e.target).formData()
    data.gameId = this.data.gameId

    let info = this.list[this.active]
    const id = info ? info._id : null

    gameService.editInfo(data, id)
      .then(createdInfo => {
        const dataToUpdate = { show: data.template }
        if (!id) {
          this.list.push(createdInfo)
          dataToUpdate.active = this.list.length - 1
          dataToUpdate.list = mapList(this.list)
        } else {
          info = {_id: info._id, ...data}
          this.list[this.active] = info
        }
        this.updateData(dataToUpdate)
        this.back()
      })
  }

  showInfo(e) {
    if (e) {
      const $target = $(e.target)
      const index = _.get($target, 'nativeElement.dataset.index')
      this.active = index
      if (!this.list[index].template)
        gameService.getInfoItem(this.list[index]._id)
          .then(info => {
            this.list[index] = info
            this.updateData({ show: info.template })
            this.back()
          })
      else {
        this.updateData({ show: this.list[index].template })
        this.back()
      }
    }
  }
  editInfo() {
    this.updateData({ info: this.list[this.active] })
    this.toEdit()
  }
  addInfo() {
    this.updateData({ info: this.emptyInfo })
    this.toEdit()
  }

  toEdit() {
    this.setActive('$edit')
    initSelect()
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
    return this.el.find('.rpg-info-tab-show')
  }
  get $edit() {
    return this.el.find('.rpg-info-tab-edit')
  }
  get $list() {
    return this.el.find('.rpg-info-tab-list')
  }
  get emptyInfo() {
    return {
      content: '',
      title: '',
      category: null,
      sign: ''
    }
  }

}

export const rpgGameInfo = new GameInfo({
  selector: 'rpg-game-info',
  template: /*html*/`
  <div class="layout-row layout-align-center-center relative">
    <div data-index="1" class="w_100 rpg-info-tab active rpg-info-tab-list">
      {{ list }}
      <div class="absolute top0 right4">
        <a class="rpg-add-info btn-floating waves-effect waves-light blue">
          <i class="material-icons">add</i>
        </a>
      </div>
    </div>
    <div data-index="2" class="w_100 rpg-info-tab rpg-info-tab-show">
      {{ show }}
      <section class="layout-row layout-align-end-center">
        <button type="button" class="btn grey mv_12 back-to-list">
          Назад <i class="material-icons right">keyboard_backspace</i>
        </button>
      </section>
      <div class="absolute top0 right4">
        <a class="rpg-edit-info btn-floating waves-effect waves-light blue">
          <i class="material-icons">edit</i>
        </a>
      </div>
    </div>
    <form data-index="3" class="w_100 rpg-info-tab rpg-info-tab-edit">
      <section class="w_100 field layout-column">
        <section class="w_100 field layout-row">
          <div class="pr_12 flex_70">
            <input id="title" type="text" value="{{ info.title }}">
            <label class="static" for="title">Название</label>
          </div>
          <div class="pl_12 flex_30">
            <input id="sign" type="text" value="{{ info.sign }}">
            <label class="static" for="sign">Знак</label>
          </div>
        </section>
        <textarea class="materialize-textarea article-edit" id="template">
          {{ info.template }}
        </textarea>
        <label class="static" for="template">Описание</label>
        <section>
          <select id="category" name="category">
            <option value="2">Подготовка к игре</option>
            <option value="3">Описание мира</option>
          </select>
          <label class="static">Выберите категорию</label>
        </section>
      </section>
      <section class="layout-row layout-align-space-between-center">
        <button type="submit" class="btn blue lighten-2 mv_12">
          Обновить <i class="material-icons right">check</i>
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
        <a data-index="${i}" class="rpg-info-show-item">
          ${item.title}
        </a>
      </li>
    `
  return /*html*/`
    <ul class="rpg-info-list">
      ${items.length ? items : 'Для этой игры пока не добавлено ни одного материала'}
    </ul>
  `
}

function initSelect() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
}