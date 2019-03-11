import { RPGComponent, router } from "core"
import { gameService } from "../../services/game.service"
import { defaultLoader } from '../../common/loader'

class Game extends RPGComponent {
  constructor(config) {
    super(config)
    this.data = {
      header: defaultLoader,
      template: ''
    }
  }

  onInit() {
    this.fit(this.params)
    gameService.getGame(this.params.id)
      .then(res => {
        this.updateData({
          header: setGameHeader(res),
          gameDesc: res.description,
          id: this.params.id
        })
        this.data.tabs = getTabs.call(this)
      })
  }

  events() {
    return {
      "click .rpg-delete-game": "deleteGame"
    }
  }

  deleteGame() {
    gameService.deleteGame(this.params.id)
      .then(() => router.navigate(''))
  }

}

export const rpgGame = new Game({
  selector: 'rpg-game',
  template: /*html*/`
  <div class="layout-row layout-align-center-center">
    <div class="flex_100 card mt_20 w_33 trans5">
      {{ header }}
      <rpg-tabs
        [gameId]="id"
        [gameDesc]="gameDesc"
        [tabs]="tabs"></rpg-tabs>
    </div>
  </div>
  `
})

function setGameHeader(game) {
  return /*html*/`
    <section>
      <h4 class="ta-c">${game.title || 'Игра не найдена'}</h4>
      ${game._id ?
        /*html*/`<div class="absolute top24 right24">
          <a class="rpg-delete-game btn-floating waves-effect waves-light red">
            <i class="material-icons">delete</i>
          </a>
        </div>` : ''
      }
    </section>
  `
}

function getTabs() {
  return [
    {
      title: 'Описание',
      name: `/#games/${this.params.id}/description`,
      template: /*html*/`<rpg-game-desc [gameId]="gameId" [content]="gameDesc"></rpg-game-desc>`
    },
    {
      title: 'Материалы игры',
      name: `/#games/${this.params.id}/info`,
      template: /*html*/`<rpg-game-info [gameId]="gameId"></rpg-game-info>`
    },
    {
      title: 'Роли',
      name: `/#games/${this.params.id}/roles`,
      template: /*html*/`<rpg-game-roles [gameId]="gameId"></rpg-game-roles>`
    },
  ]
}