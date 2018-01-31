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
        this._consultaService.getEventPAN().subscribe( res => {
            console.log(res);
            this.eventos = JSON.parse(res);
        });

        this._consultaService.getTierraPAN().subscribe( res => {
            console.log(res);
            this.tierra = JSON.parse(res);
        });
  }

  ngOnInit() {
  }

}
