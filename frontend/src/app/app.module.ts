import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TacometroComponent } from './components/tacometro/tacometro.component';
import { ConsultaService } from './services/consulta.service';
import { HomeComponent } from './components/home/home.component';

import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PriComponent } from './components/pri/pri.component';
import { PanComponent } from './components/pan/pan.component';
import { MorenaComponent } from './components/morena/morena.component';

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
  providers: [ ConsultaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
