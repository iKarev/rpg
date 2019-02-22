import { bootstrap, _ } from 'core'
import { appModule } from './app/app.module'

import './sass/base.sass'

_.delay(700).then(() => {
  bootstrap(appModule)
})
