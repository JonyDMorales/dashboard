import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { Chart } from 'chart.js';
import { ConsultaService } from '../../services/consulta.service';
import 'rxjs/add/operator/map';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    eventos = [];
    tierra = [];

    constructor( public _graphicsService: GraphicsService, public _consultaService: ConsultaService ) {
        this.getGastoTotalEventos();
        this.getGastoTotalTierra();
    }

    ngOnInit() { }

    public getGastoTotalEventos() {
        this._consultaService.getGastoTotalEventos('PRI-PVEM-PANAL', '', '').subscribe(PRI => {
            this._consultaService.getGastoTotalEventos('PAN-PRD-MC', '', '').subscribe(PAN => {
                this._consultaService.getGastoTotalEventos('MORENA-PT-PES', '', '').subscribe(MORENA => {
                    const estructura = {
                        datasets: [{
                            data: [ PRI, PAN, MORENA ],
                            backgroundColor: [ '#32DF00', '#2F74D0', '#FF4848' ],
                            label: ''
                        }],
                        labels: [
                            'PRI',
                            'PAN',
                            'MORENA'
                        ]
                    };
                    this.eventos = this._graphicsService.graphicDonut('eventos', estructura, 'Gasto total por alianza');
                });
            });
        });
    }

    public getGastoTotalTierra() {
        this._consultaService.getGastoTotalTierra('PRI-PVEM-PANAL', '', '').subscribe(PRI => {
            this._consultaService.getGastoTotalTierra('PAN-PRD-MC', '', '').subscribe(PAN => {
                this._consultaService.getGastoTotalTierra('MORENA-PT-PES', '', '').subscribe(MORENA => {
                    const estructura = {
                        datasets: [{
                            data: [ PRI, PAN, MORENA ],
                            backgroundColor: [ '#32DF00', '#2F74D0', '#FF4848' ],
                            label: ''
                        }],
                        labels: [
                            'PRI',
                            'PAN',
                            'MORENA'
                        ]
                    };
                    this.tierra = this._graphicsService.graphicDonut('tierra', estructura, 'Gasto total por alianza');
                });
            });
        });
    }
}
