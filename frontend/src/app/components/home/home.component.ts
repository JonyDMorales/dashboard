import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { Chart } from 'chart.js';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    eventos = [];
    tierra = [];
    gastoTotalPRI = 0;
    gastoTotalPAN = 0;
    gastoTotalMORENA = 0;

    constructor( public _graphicsService: GraphicsService, public _consultaService: ConsultaService ) {
        this.getGastoTotal();
    }

    ngOnInit() {
        const estructura = {
            datasets: [{
                data: [
                    300, 200, 500
                ],
                backgroundColor: [ '#ffffff', '#000000', '#f56db3' ],
                label: ''
            }],
            labels: [
                'PRI',
                'PAN',
                'MORENA'
            ]
        };
        this.eventos = this._graphicsService.graphicDonut('eventos', estructura, 'Gasto total por alianza');
        this.tierra = this._graphicsService.graphicDonut('tierra', estructura, 'Gasto total por alianza');
    }

    public getGastoTotal() {
        this._consultaService.getGastoTotalEventos('PRI-PVEM-PANAL', '', '').subscribe(res => {
            this.gastoTotalPRI = res;
            console.log('PRI: ' + this.gastoTotalPRI);
        });
        this._consultaService.getGastoTotalEventos('PAN-PRD-MC', '', '').subscribe(res => {
            this.gastoTotalPAN = res;
            console.log('PAN: ' + this.gastoTotalPAN);
        });
        this._consultaService.getGastoTotalEventos('MORENA-PT-PES', '', '').subscribe(res => {
            this.gastoTotalMORENA = res;
            console.log('Morena: ' + this.gastoTotalMORENA);
        });
    }
}
