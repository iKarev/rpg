import { http, _ } from 'core'

class UserService {
  constructor() {
    this.headers = {
      "Content-Type": "application/json"
    }
    this.store = {loggedIn: this.checkLoggedIn()}
  }

  listen(prop, callback) {
    this.store = _.addListener(this.store, callback, prop)
    return this.store[prop]
  }

  login(data) {
    const options = {body: _.string(data), headers: this.headers}
    http.post('/users/sign_in', options)
      .then(response => {
        this.setToken(`bearer ${response.token}`)
        this.store.loggedIn = this.checkLoggedIn()
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