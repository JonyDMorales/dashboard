import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit {
    
    candidato = "";
    circunscripcion = "";
    estado = "";

    constructor(public _authService: AuthService, public _router: Router) {
        this._authService.handleAuthentication();
        this.candidato = localStorage.getItem('candidato');
        this.circunscripcion = localStorage.getItem('circunscripcion');
        this.estado = localStorage.getItem('estado');
    }

    ngOnInit() {}

    public reload(){
        window.location.reload();
    }

    public login(){
        this._authService.login();
    }

    public setQuien(persona){
        localStorage.setItem('candidato', persona);
    }

    public setCircunscripcion(circunscripcion){
        localStorage.setItem('circunscripcion', circunscripcion);
    }

    public setEstado(estado){
        localStorage.setItem('estado', estado);
    }

    public logout(){
        this._authService.logout();
    }

}
