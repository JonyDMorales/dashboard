import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit {
    
    date1:Date;
    date2:any;

    constructor(public _authService: AuthService, public _router: Router) {
        this._authService.handleAuthentication();
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
        //this._router.navigate(['home', Math.random()]);
    }

    public setCircunscripcion(circunscripcion){
        localStorage.setItem('circunscripcion', circunscripcion);
        //window.location.reload();
    }

    public setFecha1(fecha){
        localStorage.setItem('fecha_inicio', fecha);
        //window.location.reload();
    }

    public setFecha2(fecha){
        localStorage.setItem('fecha_termino', fecha);
        //window.location.reload();
    }

    public logout(){
        this._authService.logout();
    }

}
