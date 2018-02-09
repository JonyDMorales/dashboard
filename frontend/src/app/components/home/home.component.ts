import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { Chart } from 'chart.js';
import { ConsultaService } from '../../services/consulta.service';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    eventos = [];
    tierra = [];
    conteoEventos = [];
    categoriaTierra = [];

    constructor( public _graphicsService: GraphicsService, public _consultaService: ConsultaService ) {
        this.getGastoTotalEventos();
        this.getGastoTotalTierra();
        this.getEventosTotales();
        this.getcategoriaTierra();
    }

    ngOnInit() { }

    public getGastoTotalEventos() {
        this._consultaService.getGastoTotalEventos('PRI-PVEM-PANAL', '', '').subscribe(PRI => {
            this._consultaService.getGastoTotalEventos('PAN-PRD-MC', '', '').subscribe(PAN => {
                this._consultaService.getGastoTotalEventos('MORENA-PT-PES', '', '').subscribe(MORENA => {
                    const estructura = {
                        datasets: [{
                            data: [ PRI, PAN, MORENA ],
                            backgroundColor: [ '#008f36', '#063383', '#b3282b' ],
                            label: ''
                        }],
                        labels: [
                            'PRI',
                            'PAN',
                            'MORENA'
                        ]
                    };
                    this.eventos = this._graphicsService.graphicDonut('eventos', estructura, 'Gasto total de eventos por alianza');
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
                            backgroundColor: [ '#008f36', '#063383', '#b3282b' ],
                            label: ''
                        }],
                        labels: [
                            'PRI',
                            'PAN',
                            'MORENA'
                        ]
                    };
                    this.tierra = this._graphicsService.graphicDonut('tierra', estructura, 'Gasto total de tierra por alianza');
                });
            });
        });
    }

    public getEventosTotales() {
        let cantidadEventosPRI = 0;
        let cantidadEventosPAN = 0;
        let cantidadEventosMORENA = 0;
        this._consultaService.getConteoEventos('PRI-PVEM-PANAL', '', '').subscribe(PRI => {
            let array = Object.values(PRI);
            array.forEach(valor => {
                cantidadEventosPRI += valor;
            });
            this._consultaService.getConteoEventos('PAN-PRD-MC', '', '').subscribe(PAN => {
                array = Object.values(PAN);
                array.forEach(valor => {
                    cantidadEventosPAN += valor;
                });
                this._consultaService.getConteoEventos('MORENA-PT-PES', '', '').subscribe(MORENA => {
                    array = Object.values(MORENA);
                    array.forEach(valor => {
                        cantidadEventosMORENA += valor;
                    });
                    const estructura = {
                        labels: [ 'PRI', 'PAN', 'MORENA' ],
                        datasets: [{
                            backgroundColor: [ '#008f36', '#063383', '#b3282b' ],
                            data: [ cantidadEventosPRI, cantidadEventosPAN, cantidadEventosMORENA, 0 ]
                        }]
                    };
        this.conteoEventos = this._graphicsService.graphicHorizontal('conteoEventos', estructura, 'Cantidad de eventos por alianza');
                });
            });
        });
    }

    public getcategoriaTierra() {
        this._consultaService.getGastoTotalTierra('PRI-PVEM-PANAL', '', 'Movil').subscribe(movilPRI => {
            this._consultaService.getGastoTotalTierra('PRI-PVEM-PANAL', '', 'Fija').subscribe(fijaPRI => {
                this._consultaService.getGastoTotalTierra('PAN-PRD-MC', '', 'Movil').subscribe(movilPAN => {
                    this._consultaService.getGastoTotalTierra('PAN-PRD-MC', '', 'Fija').subscribe(fijaPAN => {
                        this._consultaService.getGastoTotalTierra('MORENA-PT-PES', '', 'Movil').subscribe(movilMORENA => {
                            this._consultaService.getGastoTotalTierra('MORENA-PT-PES', '', 'Fija').subscribe(fijaMORENA => {
                                const estructura = {
                                    labels: ['Móvil', 'Fija'],
                                    datasets: [{
                                        label: 'PRI',
                                        backgroundColor: '#008f36',
                                        data: [movilPRI, fijaPRI]
                                    }, {
                                        label: 'PAN',
                                        backgroundColor: '#063383',
                                        data: [movilPAN, fijaPAN]
                                    }, {
                                        label: 'MORENA',
                                        backgroundColor: '#b3282b',
                                        data: [ movilMORENA, fijaMORENA]
                                    }]
                                };
                this.categoriaTierra = this._graphicsService.graphicBar('categoriaTierra', estructura, 'Gasto de tierra por alianza');
                            });
                        });
                    });
                });
            });
        });
    }
}
