import { RPGModule } from 'core'
import { rpgComponent } from './app.component';
import { rpgHeader } from './common/header.component';
import { appRoutes } from './app.routes';
import { hoverDirecitve } from './directives/hover.directive';

class AppModule extends RPGModule {
  constructor(config) {
    super(config)
  }
}

export const appModule = new AppModule({
  components: [
    rpgHeader
  ],
  bootstrap: rpgComponent,
  routes: appRoutes,
  directives: [
    hoverDirecitve
  ]
})
