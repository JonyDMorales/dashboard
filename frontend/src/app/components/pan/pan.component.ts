import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-pan',
    templateUrl: './pan.component.html',
    styles: []
})
export class PanComponent implements OnInit {

    public eventos:JSON;
    public tierra:JSON;

  constructor(public _consultaService: ConsultaService) { 
    this._consultaService.getEventPAN().subscribe( res => {
        //this.eventos = JSON.parse(res._body);
    });

    this._consultaService.getTierraPAN().subscribe( res => {
        //this.tierra = JSON.parse(res._body);
    });
  }

  ngOnInit() {
  }

}
