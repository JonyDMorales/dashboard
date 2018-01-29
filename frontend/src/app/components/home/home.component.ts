import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    constructor(public _consultaService: ConsultaService) {
        this._consultaService.getEvent().subscribe( res => {
            console.log(res);
        });
    }

    ngOnInit() {}

}
