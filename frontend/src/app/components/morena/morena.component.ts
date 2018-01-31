import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-morena',
    templateUrl: './morena.component.html',
    styles: []
})
export class MorenaComponent implements OnInit {
    public eventos;
    public tierra;

    constructor(public _consultaService: ConsultaService) {
        this._consultaService.getEventMORENA().subscribe( res => {
            console.log(res);
            this.eventos = JSON.parse(res);
        });

        this._consultaService.getTierraMORENA().subscribe( res => {
            console.log(res);
            this.tierra = JSON.parse(res);
        });
     }

    ngOnInit() {}

}
