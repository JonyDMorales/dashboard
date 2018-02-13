import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-pri',
    templateUrl: './pri.component.html',
    styles: []
})
export class PriComponent implements OnInit {

    busquedaPRI = 'PRI-PVEM-PANAL';
    candidatoPresidente = 'presidente';
    candidatoSenador = 'senador';
    candidatoDiputado = 'diputadoFed';
    candidatoGobernador = 'gobernador';
    candidatoAlcalde = 'alcalde';

    eventosGastoCandidatos = [];
    eventosEstado = [];
    eventosGastoEstado = [];
    eventosGastoCategoria = [];
    tierraGastoCandidatos = [];
    tierraGastoEstado = [];


    constructor(public _graphicsService: GraphicsService, public _consultaService: ConsultaService) {
        this.getGastoTotalEventosCandidato();
        this.getEstados();
        this.getEstadosGasto();
        this.getGastoTotalTierraCandidato();
        this.getTierrraGastoEstado();
        this.getEventosGastoCategoria();
    }

    ngOnInit() {}

    public getGastoTotalEventosCandidato() {
        this._consultaService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(presidente => {
            this._consultaService.getGastoTotalEventos(this.busquedaPRI, this.candidatoSenador, '').subscribe(senador => {
                this._consultaService.getGastoTotalEventos(this.busquedaPRI, this.candidatoDiputado, '').subscribe(diputado => {
                    this._consultaService.getGastoTotalEventos(this.busquedaPRI, this.candidatoGobernador, '').subscribe(gobernador => {
                        this._consultaService.getGastoTotalEventos(this.busquedaPRI, this.candidatoAlcalde, '').subscribe(alcalde => {
                            const estructura = {
                                datasets: [{
                                    data: [ presidente, senador, diputado, gobernador, alcalde ],
                                    backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a' ],
                                    label: ''
                                }],
                                labels: [ 'Presidente', 'Senador', 'Diputado', 'Gobernador', 'Alcalde' ]
                            };
this.eventosGastoCandidatos = this._graphicsService.graphicDonut('eventosGastoCandidatos', estructura, 'Gasto total de eventos por candidato');
                        });
                    });
                });
            });
        });
    }

    public getEstados() {
        this._consultaService.getConteoEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
            const arr = this.sortJSON(res);
            const estructura = {
                datasets: [{
                    data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                    backgroundColor: [ '#008f36', '#063383', '#b3282b', '#008f36', '#ffffff' ],
                    label: ''
                }],
                labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
            };
            this.eventosEstado = this._graphicsService.graphicPie('eventosEstado', estructura, 'Estados con mayor cantidad de eventos');
        });
    }

    public getEstadosGasto() {
        this._consultaService.getGastoEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
            const arr = this.sortJSON(res);
            const estructura = {
                datasets: [{
                    data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                    backgroundColor: [ '#008f36', '#063383', '#b3282b', '#008f36', '#ffffff' ],
                    label: ''
                }],
                labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
            };
            this.eventosGastoEstado = this._graphicsService.graphicPie('eventosGastoEstado', estructura, 'Gasto de eventos por estado');
        });
    }

    public sortJSON(json) {
        const array = [];
        for(const a in json){
            array.push([a,json[a]])
        }

        array.sort(function(a, b) {return a[1] - b[1]});
        return array.reverse();
    }

    public  getGastoTotalTierraCandidato() {
        this._consultaService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, '').subscribe(presidente => {
            this._consultaService.getGastoTotalTierra(this.busquedaPRI, this.candidatoSenador, '').subscribe(senador => {
                this._consultaService.getGastoTotalTierra(this.busquedaPRI, this.candidatoDiputado, '').subscribe(diputado => {
                    this._consultaService.getGastoTotalTierra(this.busquedaPRI, this.candidatoGobernador, '').subscribe(gobernador => {
                        this._consultaService.getGastoTotalTierra(this.busquedaPRI, this.candidatoAlcalde, '').subscribe(alcalde => {
                            const estructura = {
                                datasets: [{
                                    data: [ presidente, senador, diputado, gobernador, alcalde ],
                                    backgroundColor: [ '#e60000', '#063383', '#e60000', '#008f36', '#5c5c8a' ],
                                    label: ''
                                }],
                                labels: [ 'Presidente', 'Senador', 'Diputado', 'Gobernador', 'Alcalde' ]
                            };
this.tierraGastoCandidatos = this._graphicsService.graphicDonut('tierraGastoCandidatos', estructura, 'Gasto total de tierra por candidato');
                        });
                    });
                });
            });
        });
    }

    public getTierrraGastoEstado() {
        this._consultaService.getGastoCategoriaTierra(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
            const arr = this.sortJSON(res);
            const estructura = {
                datasets: [{
                    data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                    backgroundColor: [ '#008f36', '#063383', '#b3282b', '#008f36', '#ffffff' ],
                    label: ''
                }],
                labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
            };
            this.tierraGastoEstado = this._graphicsService.graphicPie('tierraGastoEstado', estructura, 'Gasto de tierra por estado');
        });
    }

    public getEventosGastoCategoria() {
        this._consultaService.getGastoTotalEventos(this.busquedaPRI, '', 'estructura').subscribe(estructura => {
            this._consultaService.getGastoTotalEventos(this.busquedaPRI, '', 'animacion').subscribe(animacion => {
                this._consultaService.getGastoTotalEventos(this.busquedaPRI, '', 'transporte').subscribe(transporte => {
                    this._consultaService.getGastoTotalEventos(this.busquedaPRI, '', 'produccion').subscribe(produccion => {
                        this._consultaService.getGastoTotalEventos(this.busquedaPRI, '', 'espectacular').subscribe(espectacular => {
                            this._consultaService.getGastoTotalEventos(this.busquedaPRI, '', 'utilitario').subscribe(utilitario => {
                                const estruct = {
                                    datasets: [{
                                        data: [ estructura, animacion, transporte, produccion, espectacular, utilitario ],
                                        backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000'],
                                        label: ''
                                    }],
                                    labels: [ 'Estructura', 'Animacion', 'Transporte', 'Produccion', 'Espectacular', 'Utilitario' ]
                                };
    this.eventosGastoCategoria = this._graphicsService.graphicRadar('eventosGastoCategoria', estruct, 'Gasto total de eventos por candidato');
                            });
                        });
                    });
                });
            });
        });
    }


}
