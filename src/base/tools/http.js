class Http {

  get(url, options) {
    return this.sendRequest('GET', url, options)
  }
  post(url, options) {
    return this.sendRequest('POST', url, options)
  }
  delete(url, options) {
    return this.sendRequest('DELETE', url, options)
  }
  patch(url, options) {
    return this.sendRequest('PATCH', url, options)
  }

  sendRequest(method, url, options) {
    options = { method, ...options }
    return fetch(`http://localhost:3000${url}`, options).then(response => response.json())
  }

  getAuthToken() {
    if (localStorage.rpg)
      return JSON.parse(localStorage.rpg).token
  }
}

export const http = new Http()