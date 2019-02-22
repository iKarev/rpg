import { http, _ } from 'core'

class UserService {
  constructor() {
    this.headers = {
      "Content-Type": "application/json"
    }
    this.user = {loggedIn: this.checkLoggedIn()}
  }

  login(data) {
    const options = {body: _.string(data), headers: this.headers}
    http.post('/users/sign_in', options)
      .then(response => {
        this.setToken(`bearer ${response.token}`)
        console.log(this.user.loggedIn)
        this.user.loggedIn = this.checkLoggedIn()
        console.log(this.user.loggedIn)
      })
      // .catch(err => console.log(err.message))
  }

  setToken(token) {
    this.token = token
    saveTokenToStorage(token)
  }

  checkLoggedIn() {
    this.headers.authorization = getAuthToken()
    return !_.isUndefined(this.headers.authorization)
  }

}

function getAuthToken() {
  if (localStorage.rpg)
    return JSON.parse(localStorage.rpg).token
}

function saveTokenToStorage(token) {
  const rpg = localStorage.rpg ? JSON.parse(localStorage.rpg) : {}
  rpg.token = token
  localStorage.setItem('rpg', JSON.stringify(rpg))
}

export const userService = new UserService()