import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-morena',
    templateUrl: './morena.component.html',
    styles: []
})
export class MorenaComponent implements OnInit {
    
    public eventos:JSON;
    public tierra:JSON;

    constructor(public _consultaService: ConsultaService) {
        this._consultaService.getEventMORENA().subscribe( res => {
            //this.eventos = JSON.parse(res._body);
        });
    
        this._consultaService.getTierraMORENA().subscribe( res => {
            //this.tierra = JSON.parse(res._body);
        });
     }

    ngOnInit() {}

}
