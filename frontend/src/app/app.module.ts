import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgxGaugeModule } from 'ngx-gauge';

import { ConsultaEventosService } from './services/consulta.eventos.service';
import { ConsultaTierraService } from './services/consulta.tierra.service';
import { GraphicsService } from './services/graphics.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TacometroComponent } from './components/tacometro/tacometro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PriComponent } from './components/pri/pri.component';
import { PvemComponent } from './components/pvem/pvem.component';
import { PanalComponent } from './components/panal/panal.component';
import { PanComponent } from './components/pan/pan.component';
import { PrdComponent } from './components/prd/prd.component';
import { McComponent } from './components/mc/mc.component';
import { MorenaComponent } from './components/morena/morena.component';
import { PtComponent } from './components/pt/pt.component';
import { PesComponent } from './components/pes/pes.component';

import { APP_ROUTING } from './app.routes';

@NgModule({
    declarations: [
        AppComponent,
        TacometroComponent,
        HomeComponent,
        NavbarComponent,
        PriComponent,
        PanComponent,
        MorenaComponent,
        PvemComponent,
        PanalComponent,
        PrdComponent,
        McComponent,
        PtComponent,
        PesComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        ChartsModule,
        NgxGaugeModule,
        APP_ROUTING
    ],
    providers: [ ConsultaEventosService, ConsultaTierraService, GraphicsService, AuthService, AuthGuardService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
