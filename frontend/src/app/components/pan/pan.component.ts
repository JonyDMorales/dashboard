import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-pan',
    templateUrl: './pan.component.html',
    styles: []
})
export class PanComponent implements OnInit {

    public eventos;
    public tierra;

    constructor(public _consultaService: ConsultaService) {
  }

  ngOnInit() {
  }

}
