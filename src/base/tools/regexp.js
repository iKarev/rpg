export const regexpRouteParam = /\/:[a-z]+/g
export const regexpChildren = /\<([a-z]+-[a-z]+)[a-zA-Z\[\]="'\-_\s]+\>/g
export const regexpChildrenName = /\<([a-z]+-[a-z]+)+[\s\>]/g
export const regexpChildrenProps = /\[(.*?)\]="(.*?)"/g
export const regexpData = /\{{(.*?)}\}/g
export const regexpID = /\/[a-z0-9]+$/