import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-pri',
    templateUrl: './pri.component.html',
    styles: []
})
export class PriComponent implements OnInit {

    public eventos;
    public tierra;

    constructor(public _consultaService: ConsultaService) {
        this._consultaService.getEventPRI().subscribe( res => {
            console.log(res);
            this.eventos = JSON.parse(res);
        });

        this._consultaService.getTierraPRI().subscribe( res => {
            console.log(res);
            this.tierra = JSON.parse(res);
        });

    }

    ngOnInit() {}

}
