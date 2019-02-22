class Http {

  get(url) {
    return this.sendRequest('GET', url)
  }
  post(url, options) {
    return this.sendRequest('POST', url, options)
  }

  sendRequest(method, url, options) {
    options = { method, ...options }
    return fetch(`http://localhost:3000${url}`, options).then(response => response.json())
  }

}

export const http = new Http()