import { RPGComponent, router, _, $ } from "core";
import { userService } from '../services/user.service'
import { gameService } from '../services/game.service'

const authItems = [
  getMenuItem('vpn_key', 'Авторизация', 'list', 'login'),
  getMenuItem('exit_to_app', 'Выйти', 'list', null, 'rpg-menu-item-logout')
]

function getMenuItem(icon, text, type, route, classes) {
  return /*html*/`
  <li class="rpg-menu-${type}">
    <a ${route ? 'href="#' + route + '"' : '' }
      class="${type === 'list' ? 'p_16 rpg-menu-header' : 'pl_32 pr_12 pv_12'}  ${classes}">
      <i class="material-icons">${icon}</i>
      <span class="ml_8">${text}</span>
    </a>
  </li>
  `
}

class RPGHeader extends RPGComponent {
  constructor(config) {
    super(config)
    this.data = {
      loggedIn: userService.listen('loggedIn', this.onLogIn.bind(this)),
      games: ''
    }
    this.data.menuItemAuth = authItems[this.data.loggedIn ? 1 : 0]
  }

  onInit() {
    gameService.getGameList().then(res => {
      let games = ''
      for (const game of res) {
        games += getMenuItem('flag', game.title, 'item', `games/${game._id}`)
      }
      this.data.games = games
    })
  }

  events() {
    return {
      'click .rpg-menu-item': 'switchMenu',
      'click .rpg-menu-button': 'switchMenu',
      'mouseleave .rpg-menu-content': 'closeMenu',
      'click .rpg-menu-header': 'switchMenuSection',
      'click .rpg-menu-item-logout': 'onLogOut',
    }
  }

  onLogIn(val) {
    this.fit({loggedIn: val, menuItemAuth: authItems[1]})
    router.navigate('')
  }
  onLogOut() {
    userService.logout()
    this.fit({loggedIn: false, menuItemAuth: authItems[0]})
    router.navigate('login')
  }

  closeMenu(e) {
    this.switchMenu(e, true)
  }

  switchMenu({ target }, forceClose) {
    const node = _.getParent($(target), 'rpg-menu')
    const method = (forceClose || node.hasClass('active')) ? 'removeClass' : 'addClass'
    node[method]('active')
  }

  switchMenuSection({ target }) {
    const node = _.getParent($(target), 'rpg-menu-list')
    const needClose = node.hasClass('active')
    this.el.findAll('.rpg-menu-list').forEach(node => {
      node.removeClass('active')
    });
    if (!needClose)
      node.addClass('active')
  }
}

export const rpgHeader = new RPGHeader({
  selector: 'rpg-header',
  template: /*html*/`
    <div class="rpg-menu fixed h_max">
      <a class="rpg-menu-button btn-floating btn-large blue">
        <i class="large material-icons">menu</i>
      </a>
      <section class="rpg-menu-content absolute h_100 blue lighten-2">
        <ul class="m_0">
          {{ menuItemAuth }}
          <li class="rpg-menu-list">
            <a class="p_16 rpg-menu-header layout-row layout-align-space-between-start">
              <span class="layout-row layout-align-start-center">
                <i class="material-icons">public</i>
                <span class="ml_8">Игры</span>
              </span>
              <i class="material-icons rpg-menu-arrow">arrow_drop_down</i>
            </a>
            <ul class="rpg-menu-children">
              {{ games }}
              <li class="rpg-menu-item">
                <a href="#games/new" class="pl_32 pr_12 pv_12">
                  <i class="material-icons">plus_one</i>
                  <span class="ml_8">Создать игру</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <hr class="rpg-vertical-devider__white" />
        <ul class="m_0">
          <li class="rpg-menu-list">
            <a class="p_16 rpg-menu-header layout-row layout-align-space-between-start">
              <span class="layout-row layout-align-start-center">
                <i class="material-icons">account_circle</i>
                <span class="ml_8">О персонаже</span>
              </span>
              <i class="material-icons rpg-menu-arrow">arrow_drop_down</i>
            </a>
            <ul class="rpg-menu-children">
              <li class="rpg-menu-item">
                <a class="pl_32 pr_12 pv_12">
                  <i class="material-icons">account_balance</i>
                  <span class="ml_8">Вводная</span>
                </a>
              </li>
              <li class="rpg-menu-item">
                <a class="pl_32 pr_12 pv_12">
                  <i class="material-icons">filter_list</i>
                  <span class="ml_8">Выжимка</span>
                </a>
              </li>
              <li class="rpg-menu-item">
                <a class="pl_32 pr_12 pv_12">
                  <i class="material-icons">local_movies</i>
                  <span class="ml_8">Подготовка</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="rpg-menu-list">
            <a class="p_16 rpg-menu-header layout-row layout-align-space-between-start">
              <span class="layout-row layout-align-start-center">
                <i class="material-icons">show_chart</i>
                <span class="ml_8">Подготовка к игре</span>
              </span>
              <i class="material-icons rpg-menu-arrow">arrow_drop_down</i>
            </a>
            <ul class="rpg-menu-children">
              <li class="rpg-menu-item">
                <a class="pl_32 pr_12 pv_12">
                  <i class="material-icons">beach_access</i>
                  <span class="ml_8">Костюмы и антураж</span>
                </a>
              </li>
              <li class="rpg-menu-item">
                <a class="pl_32 pr_12 pv_12">
                  <i class="material-icons">business_center</i>
                  <span class="ml_8">Оферта</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="rpg-menu-list">
            <a class="p_16 rpg-menu-header layout-row layout-align-space-between-start">
              <span class="layout-row layout-align-start-center">
                <i class="material-icons">landscape</i>
                <span class="ml_8">Мир игры</span>
              </span>
              <i class="material-icons rpg-menu-arrow">arrow_drop_down</i>
            </a>
            <ul class="rpg-menu-children">
              <li class="rpg-menu-item">
                <a href="#info/history" class="pl_32 pr_12 pv_12">
                  <i class="material-icons">hourglass_full</i>
                  <span class="ml_8">История</span>
                </a>
              </li>
              <li class="rpg-menu-item">
                <a href="#info/geography" class="pl_32 pr_12 pv_12">
                  <i class="material-icons">map</i>
                  <span class="ml_8">География</span>
                </a>
              </li>
              <li class="rpg-menu-item">
                <a href="#info/organizations" class="pl_32 pr_12 pv_12">
                  <i class="material-icons">category</i>
                  <span class="ml_8">Организации</span>
                </a>
              </li>
              <li class="rpg-menu-item">
                <a href="#info/religion" class="pl_32 pr_12 pv_12">
                  <i class="material-icons">brightness_7</i>
                  <span class="ml_8">Религия</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  `
})