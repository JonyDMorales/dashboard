import { Routes, RouterModule  } from '@angular/router';

import { PriComponent } from './components/pri/pri.component';
import { PanComponent } from './components/pan/pan.component';
import { MorenaComponent } from './components/morena/morena.component';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES:Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'PRI', component: PriComponent },
    { path: 'PAN', component: PanComponent },
    { path: 'MORENA', component: MorenaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);