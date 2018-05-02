import { Routes, RouterModule } from '@angular/router';

import { PriComponent } from './components/pri/pri.component';
import { PvemComponent } from './components/pvem/pvem.component';
import { PanalComponent } from './components/panal/panal.component';
import { PanComponent } from './components/pan/pan.component';
import { PrdComponent } from './components/prd/prd.component';
import { McComponent } from './components/mc/mc.component';
import { MorenaComponent } from './components/morena/morena.component';
import { PtComponent } from './components/pt/pt.component';
import { PesComponent } from './components/pes/pes.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';

const APP_ROUTES:Routes = [
    { path: 'home', component: HomeComponent, canActivate:[ AuthGuardService ] },
    { path: 'PRI', component: PriComponent, canActivate: [AuthGuardService] },
    { path: 'PVEM', component: PvemComponent, canActivate: [AuthGuardService] },
    { path: 'PANAL', component: PanalComponent, canActivate: [AuthGuardService] },
    { path: 'PAN', component: PanComponent, canActivate: [AuthGuardService] },
    { path: 'PRD', component: PrdComponent, canActivate: [AuthGuardService] },
    { path: 'MC', component: McComponent, canActivate: [AuthGuardService] },
    { path: 'MORENA', component: MorenaComponent, canActivate: [AuthGuardService] },
    { path: 'PT', component: PtComponent, canActivate: [AuthGuardService] },
    { path: 'PES', component: PesComponent, canActivate: [AuthGuardService] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
