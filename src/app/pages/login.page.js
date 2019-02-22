import { RPGComponent, router, $ } from "core";
import { userService } from "../services/user.service"

class LoginPage extends RPGComponent {
  constructor(config) {
    super(config)
  }

  events() {
    return {
      'submit .submit-form': 'onSubmit'
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const data = $(e.target).formData()
    userService.login(data)
  }
}

export const loginPage = new LoginPage({
  selector: 'rpg-login-page',
  template: /*html*/`
  <div class="h_max m_0 layout-column layout-align-center-center">
    <div class="card mt_20 w_33 ph_20 pv_12">
      <h4 class="mb_0 ta-c">Вход</h4>
      <form class="rpg-form submit-form">
        <div class="layout-column layout-align-start-center">
          <section class="w_100 field">
            <input id="email" type="text">
            <label for="email">E-mail</label>
          </section>
          <section class="w_100 field">
            <input id="password" type="password">
            <label for="password">Пароль</label>
          </section>
          <button type="submit" class="btn purple lighten-2 mv_12">
            Войти <i class="material-icons right">send</i>
          </button>
          <p class="mt_8 rpg-form-info">Если вы входите впервые, вы будете зарегистрированы автоматически</p>
        </div>
      </form>
    </div>
  </div>
  `
})