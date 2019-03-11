export const router = {
  getUrl() {
    return window.location.hash.slice(1)
  },
  navigate(hash) {
    window.location.hash = hash
  }
}



// getParams() {
//   const urlParts = this.getUrl().split('/') // Получаем Url
  
//   const section = this.routes.filter(r => r.path.match(`${urlParts[0]}/`)) // Смотрим, совпадает ли начало url с каким-нибудь роутом

//   if (!section.length)
//     return null

//   let route
//   for (var i = 0; i < section.length; i++)
//     if (route = section[i].match(regexpRouteParam))
//       break

//   return {[route[0].slice(2)]: [urlParts[1]]}

// }