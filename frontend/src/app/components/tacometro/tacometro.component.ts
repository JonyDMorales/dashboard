import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-tacometro',
    templateUrl: './tacometro.component.html',
    styles: []
})
export class TacometroComponent implements OnInit {

    valorPermitido = 459000000;
    valorMax = this.valorPermitido + (this.valorPermitido * 0.05);

    gaugeValuePRI = 0;
    costoPRI = 0;
    colorPRI = '';

    gaugeValuePAN = 0;
    costoPAN = 0;
    colorPAN = '';

    gaugeValueMORENA = 0;
    costoMORENA = 0;
    colorMORENA = '';

    constructor(public _consultaService: ConsultaService) {
        this.getTotalPRI();
        this.getTotalPAN();
        this.getTotalMORENA();
    }

    ngOnInit() {}

    public getTotalPRI() {
        this._consultaService.getGastoTotalEventos('PRI-PVEM-PANAL', '', '').subscribe(eventosPRI => {
            this._consultaService.getGastoTotalTierra('PRI-PVEM-PANAL', '', '').subscribe(tierraPRI => {
                this.costoPRI = eventosPRI + tierraPRI;
                this.gaugeValuePRI = this.costoPRI / 1000000;
                if (this.costoPRI < this.valorPermitido) {
                    this.colorPRI = '#2ecc71';
                } else if ( this.costoPRI < this.valorMax ) {
                    this.colorPRI = '#FFFF99';
                } else {
                    this.colorPRI = '#FF0000';
                }
            });
        });
    }

    public getTotalPAN() {
        this._consultaService.getGastoTotalEventos('PAN-PRD-MC', '', '').subscribe(eventosPAN => {
            this._consultaService.getGastoTotalTierra('PAN-PRD-MC', '', '').subscribe(tierraPAN => {
                this.costoPAN = eventosPAN + tierraPAN;
                this.gaugeValuePAN = this.costoPAN / 1000000;
                if (this.costoPAN < this.valorPermitido) {
                    this.colorPAN = '#2ecc71';
                } else if ( this.costoPAN < this.valorMax ) {
                    this.colorPAN = '#FFFF99';
                } else {
                    this.colorPAN = '#FF0000';
                }
            });
        });
    }

    public getTotalMORENA() {
        this._consultaService.getGastoTotalEventos('MORENA-PT-PES', '', '').subscribe(eventosMORENA => {
            this._consultaService.getGastoTotalTierra('MORENA-PT-PES', '', '').subscribe(tierraMORENA => {
                this.costoMORENA = eventosMORENA + tierraMORENA;
                this.gaugeValueMORENA = this.costoMORENA / 1000000;
                if (this.costoMORENA < this.valorPermitido) {
                    this.colorMORENA = '#2ecc71';
                } else if ( this.costoMORENA < this.valorMax ) {
                    this.colorMORENA = '#FFFF99';
                } else {
                    this.colorMORENA = '#FF0000';
                }
            });
        });
    }
}
