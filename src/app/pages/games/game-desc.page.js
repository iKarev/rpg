import { RPGComponent, $, _ } from "core"
import { gameService } from "../../services/game.service"

class GameDescription extends RPGComponent {
  constructor(config) {
    super(config)
  }

  onInit() {
    this.fit(this.props)
  }

  events() {
    return {
      "click .rpg-edit-description": "startEditing",
      "click .cancel-editing": "finishEditing",
      "submit .rpg-description-edit": "editGame",
    }
  }

  editGame(e) {
    e.preventDefault()
    const data = $(e.target).formData()
    gameService.editGame(this.data.gameId, data)
      .then(() => this.finishEditing())
  }

  get $edit() {
    return this.el.find('.rpg-description-edit')
  }
  get $show() {
    return this.el.find('.rpg-description-show')
  }

  startEditing() {
    this.$edit.addClass('active')
    this.$show.addClass('remove')
  }
  finishEditing() {
    this.$edit.removeClass('active')
    this.$show.removeClass('remove')
  }

}

export const rpgGameDescription = new GameDescription({
  selector: 'rpg-game-desc',
  template: /*html*/`
  <div class="layout-row layout-align-center-center relative">
    <div class="w_100 rpg-description-show">
      {{ content }}
      <div class="absolute top0 right4">
        <a class="rpg-edit-description btn-floating waves-effect waves-light blue">
          <i class="material-icons">edit</i>
        </a>
      </div>
    </div>
    <form class="w_100 rpg-description-edit">
      <section class="w_100 field layout-column">
        <textarea class="materialize-textarea game-new-description" id="description">
          {{ content }}
        </textarea>
        <label class="static" for="password">Описание</label>
      </section>
      <section class="layout-row layout-align-space-between-center">
        <button type="submit" class="btn blue lighten-2 mv_12">
          Обновить <i class="material-icons right">check</i>
        </button>
        <button type="button" class="btn grey mv_12 cancel-editing">
          Отмена <i class="material-icons right">clear</i>
        </button>
      </section>
    </form>
  </div>
  `
})