import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ConsultaService } from './services/consulta.service';
import { GraphicsService } from './services/graphics.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TacometroComponent } from './components/tacometro/tacometro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PriComponent } from './components/pri/pri.component';
import { PanComponent } from './components/pan/pan.component';
import { MorenaComponent } from './components/morena/morena.component';

import { APP_ROUTING } from './app.routes';


@NgModule({
    declarations: [
        AppComponent,
        TacometroComponent,
        HomeComponent,
        NavbarComponent,
        PriComponent,
        PanComponent,
        MorenaComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        APP_ROUTING
    ],
    providers: [ ConsultaService, GraphicsService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
