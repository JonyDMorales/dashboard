import { Routes, RouterModule } from '@angular/router';

import { PriComponent } from './components/pri/pri.component';
import { PanComponent } from './components/pan/pan.component';
import { MorenaComponent } from './components/morena/morena.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';

const APP_ROUTES:Routes = [
    { path: 'home', component: HomeComponent, canActivate:[ AuthGuardService ] },
    { path: 'PRI', component: PriComponent, canActivate: [AuthGuardService] },
    { path: 'PAN', component: PanComponent, canActivate: [AuthGuardService] },
    { path: 'MORENA', component: MorenaComponent, canActivate: [AuthGuardService] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
