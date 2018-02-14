import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { ConsultaEventosService } from '../../services/consulta.eventos.service';
import { ConsultaTierraService } from '../../services/consulta.tierra.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    busquedaPRI = 'PRI-PVEM-PANAL';
    busquedaPAN = 'PAN-PRD-MC';
    busquedaMORENA = 'MORENA-PT-PES';
    eventos = [];
    tierra = [];
    conteoEventos = [];
    categoriaTierra = [];

    constructor( public _graphicsService: GraphicsService,
                 public _consultaEventosService: ConsultaEventosService,
                 public _consultaTierraService: ConsultaTierraService) {

        this.getGastoTotalEventos();
        this.getGastoTotalTierra();
        this.getEventosTotales();
        this.getcategoriaTierra();
    }

    ngOnInit() { }

    public getGastoTotalEventos() {
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', '').subscribe(PRI => {
            this._consultaEventosService.getGastoTotalEventos(this.busquedaPAN, '', '').subscribe(PAN => {
                this._consultaEventosService.getGastoTotalEventos(this.busquedaMORENA, '', '').subscribe(MORENA => {
                    const estructura = {
                        datasets: [{
                            data: [ PRI, PAN, MORENA ],
                            backgroundColor: [ '#008f36', '#063383', '#b3282b' ],
                            label: ''
                        }],
                        labels: [ 'PRI', 'PAN', 'MORENA' ]
                    };
                    this.eventos = this._graphicsService.graphicDonut('eventos', estructura, 'Gasto total de eventos por alianza');
                });
            });
        });
    }

    public getEventosTotales() {
        let cantidadEventosPRI = 0;
        let cantidadEventosPAN = 0;
        let cantidadEventosMORENA = 0;
        this._consultaEventosService.getConteoEventos(this.busquedaPRI, '', '').subscribe(PRI => {
            let array = Object.values(PRI);
            array.forEach(valor => {
                cantidadEventosPRI += valor;
            });
            this._consultaEventosService.getConteoEventos(this.busquedaPAN, '', '').subscribe(PAN => {
                array = Object.values(PAN);
                array.forEach(valor => {
                    cantidadEventosPAN += valor;
                });
                this._consultaEventosService.getConteoEventos(this.busquedaMORENA, '', '').subscribe(MORENA => {
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

    /*************** A partir de aqui es Tierra, Eventos no pasar ***************/

    public getGastoTotalTierra() {
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', '','').subscribe(PRI => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPAN, '', '', '').subscribe(PAN => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaMORENA, '', '', '').subscribe(MORENA => {
                    const estructura = {
                        datasets: [{
                            data: [ PRI, PAN, MORENA ],
                            backgroundColor: [ '#008f36', '#063383', '#b3282b' ],
                            label: ''
                        }],
                        labels: [ 'PRI', 'PAN', 'MORENA' ]
                    };
                    this.tierra = this._graphicsService.graphicDonut('tierra', estructura, 'Gasto total de tierra por alianza');
                });
            });
        });
    }

    public getcategoriaTierra() {
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', 'Movil', '').subscribe(movilPRI => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', 'Fija', '').subscribe(fijaPRI => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaPAN, '', 'Movil', '').subscribe(movilPAN => {
                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPAN, '', 'Fija', '').subscribe(fijaPAN => {
                        this._consultaTierraService.getGastoTotalTierra(this.busquedaMORENA, '', 'Movil', '').subscribe(movilMORENA => {
                            this._consultaTierraService.getGastoTotalTierra(this.busquedaMORENA, '', 'Fija', '').subscribe(fijaMORENA => {
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
