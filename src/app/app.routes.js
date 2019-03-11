import { homePage } from "./pages/home.page"
import { tabsPage } from "./pages/tabs.page"
import { loginPage } from "./pages/login.page"
import { rpgNewGame } from "./pages/games/new-game.page"
import { rpgGame } from "./pages/games/game.page"
import { rpgInfoGeography } from "./pages/world/geography.page"
import { rpgInfoHistory } from "./pages/world/history.page"
import { rpgInfoOrganizations } from "./pages/world/organizations.page"
import { rpgInfoReligion } from "./pages/world/religion.page"
import { notFound } from "./common/not-found.component";

export const appRoutes = [
  { path: '', component: homePage },
  { path: 'tabs', component: tabsPage },
  { path: 'login', component: loginPage },
  { path: 'games/new', component: rpgNewGame },
  { path: 'games/:id', component: rpgGame },
  { path: 'info/history', component: rpgInfoHistory },
  { path: 'info/geography', component: rpgInfoGeography },
  { path: 'info/organizations', component: rpgInfoOrganizations },
  { path: 'info/religion', component: rpgInfoReligion },
  { path: '**', component: notFound }
]
