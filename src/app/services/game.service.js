import { RPGService, http, _ } from 'core'

class GameService extends RPGService {
  constructor() {
    super()
    this.store = {games: []}
  }

  getGameList() {
    const options = {headers: this.getHeaders()}
    return http.get(`/games/`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }
  createGame(data) {
    const options = {body: _.toString(data), headers: this.getHeaders()}
    return http.post('/games/', options)
      .then(res => _.get(res, 'createdGame._id'))
      .catch(err => console.log(err.message))
  }
  getGame(id) {
    const options = {headers: this.getHeaders()}
    return http.get(`/games/${id}`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }
  editGame(id, data) {
    const options = {body: _.toString(data), headers: this.getHeaders()}
    return http.patch(`/games/${id}`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }
  deleteGame(id) {
    const options = {headers: this.getHeaders()}
    return http.delete(`/games/${id}`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }


  getGameInfo(id) {
    const options = {headers: this.getHeaders()}
    return http.get(`/games/${id}/info`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }
  getInfoItem(id) {
    const options = {headers: this.getHeaders()}
    return http.get(`/info/${id}`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }
  editInfo(data, infoId) {
    const options = {body: _.toString(data), headers: this.getHeaders()}
    const method = infoId ? 'patch' : 'post'
    return http[method](`/info/${infoId || ''}`, options)
      .then(res => res.createdInfo)
      .catch(err => console.log(err.message))
  }

  getGameRoles(id) {
    const options = {headers: this.getHeaders()}
    return http.get(`/games/${id}/roles`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }
  getRolesItem(id) {
    const options = {headers: this.getHeaders()}
    return http.get(`/roles/${id}`, options)
      .then(res => res)
      .catch(err => console.log(err.message))
  }
  editRole(data, roleId) {
    const options = {body: _.toString(data), headers: this.getHeaders()}
    const method = roleId ? 'patch' : 'post'
    return http[method](`/roles/${roleId || ''}`, options)
      .then(res => res.role)
      .catch(err => console.log(err.message))
  }

}

export const gameService = new GameService()