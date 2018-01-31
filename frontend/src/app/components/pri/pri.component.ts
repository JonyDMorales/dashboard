import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-pri',
    templateUrl: './pri.component.html',
    styles: []
})
export class PriComponent implements OnInit {

    public eventos:JSON;
    public tierra:JSON;

    constructor(public _consultaService: ConsultaService) { 
        
        this._consultaService.getEventPRI().subscribe( res => {
            //this.eventos = JSON.parse(res._body);
        });

        this._consultaService.getTierraPRI().subscribe( res => {
            //this.tierra = JSON.parse(res._body);
        });

    }

    ngOnInit() {}

}
