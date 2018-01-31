import { Routes, RouterModule  } from '@angular/router';

import { PriComponent } from './components/pri/pri.component';
import { PanComponent } from './components/pan/pan.component';
import { MorenaComponent } from './components/morena/morena.component';

const APP_ROUTES:Routes = [
    { path: 'PRI', component: PriComponent },
    { path: 'PAN', component: PanComponent },
    { path: 'MORENA', component: MorenaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'PRI' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);