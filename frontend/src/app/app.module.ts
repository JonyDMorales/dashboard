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

@NgModule({
  declarations: [
    AppComponent,
    TacometroComponent,
    HomeComponent,
    NavbarComponent
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
