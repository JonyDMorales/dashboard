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

    constructor(public _consultaService: ConsultaService) {}

    ngOnInit() {}

}
