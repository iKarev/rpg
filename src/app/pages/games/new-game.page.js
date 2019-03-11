import { RPGComponent, router, $ } from "core";
import { gameService } from "../../services/game.service"

class NewGame extends RPGComponent {
  constructor(config) {
    super(config)
  }

  events() {
    return {
      'submit .submit-form': 'createGame',
    }
  }

  createGame(e) {
    e.preventDefault()
    const data = $(e.target).formData()
    gameService.createGame(data)
      .then(gameId => router.navigate(`games/${gameId}`))
  }

}

export const rpgNewGame = new NewGame({
  selector: 'rpg-game-new',
  template: /*html*/`
  <div class="layout-row layout-align-center-center">
    <div class="flex_100 card mt_20 w_33 ph_20 pv_12">
      <h4 class="mt_16 ta-c">Создание игры</h4>
      <form class="rpg-create-game submit-form">
        <div class="layout-column layout-align-start-center">
          <section class="w_100 field">
            <input id="title" type="text">
            <label class="static" for="title">Название</label>
          </section>
          <section class="w_100 field layout-column">
            <textarea class="materialize-textarea game-new-description" id="description"></textarea>
            <label class="static" for="password">Описание</label>
          </section>
          <button type="submit" class="btn blue lighten-2 mv_12">
            Создать <i class="material-icons right">add</i>
          </button>
        </div>
      </form>
    </div>
  </div>
  `
})