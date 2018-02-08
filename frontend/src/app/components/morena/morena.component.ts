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
     }

    ngOnInit() {}

}
