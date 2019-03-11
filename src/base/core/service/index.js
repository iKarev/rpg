import { _ } from 'core'
import { http } from '../../tools/http';

export class Service {

  constructor() {
    this.headers = {
      "Content-Type": "application/json"
    }
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      "authorization": http.getAuthToken()
    }
  }

  listen(prop, callback) {
    this.store = _.addListener(this.store, callback, prop)
    return this.store[prop]
  }

}