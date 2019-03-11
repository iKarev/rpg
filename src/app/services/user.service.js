import { RPGService, http, _ } from 'core'

class UserService extends RPGService {
  constructor() {
    super()
    this.store = {
      loggedIn: this.checkLoggedIn()
    }
  }

  login(data) {
    const options = {body: _.toString(data), headers: this.getHeaders()}
    http.post('/users/sign_in', options)
      .then(response => {
        if (!response.token)
          throw new Error('Auth failed')
        this.setToken(`bearer ${response.token}`)
        this.store.loggedIn = true
      })
      .catch(err => console.log(err.message))
  }
  logout() {
    removeItemFromStorage('token')
    this.store.loggedIn = false
  }

  setToken(token) {
    saveItemToStorage('token', token)
  }

  checkLoggedIn() {
    this.headers.authorization = http.getAuthToken()
    return !_.isUndefined(this.headers.authorization)
  }

}

function saveItemToStorage(name, value) {
  const rpg = getStorage()
  rpg[name] = value
  localStorage.setItem('rpg', JSON.stringify(rpg))
}

function removeItemFromStorage(name) {
  const rpg = getStorage()
  delete rpg[name]
  localStorage.setItem('rpg', JSON.stringify(rpg))
}

function getStorage() {
  return localStorage.rpg ? JSON.parse(localStorage.rpg) : {}
}

export const userService = new UserService()