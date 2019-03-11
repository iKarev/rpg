import { RPGModule } from 'core'
import { rpgComponent } from './app.component';
import { rpgHeader } from './common/header.component';
import { rpgTabs } from './common/tabs.component';
import { appRoutes } from './app.routes';
import { hoverDirecitve } from './directives/hover.directive';
import { rpgGameDescription } from './pages/games/game-desc.page';
import { rpgGameInfo } from './pages/games/game-info.page';
import { rpgGameRoles } from './pages/games/game-roles.page';

class AppModule extends RPGModule {
  constructor(config) {
    super(config)
  }
}

export const appModule = new AppModule({
  components: [
    rpgHeader,
    rpgTabs,
    rpgGameDescription,
    rpgGameInfo,
    rpgGameRoles
  ],
  bootstrap: rpgComponent,
  routes: appRoutes,
  directives: [
    hoverDirecitve
  ]
})
