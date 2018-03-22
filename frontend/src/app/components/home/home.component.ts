import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { ConsultaEventosService } from '../../services/consulta.eventos.service';
import { ConsultaTierraService } from '../../services/consulta.tierra.service';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    busquedaPRI:string = 'PRI-PVEM-PANAL';
    busquedaPAN:string = 'PAN-PRD-MC';
    busquedaMORENA:string = 'MORENA-PT-PES';
    
    eventos:Array<any> = [];
    loadingEventos:boolean = true;
    tierra:Array<any> = [];
    loadingTierra:boolean = true;
    conteoEventos:Array<any> = [];
    loadingConteoEventos:boolean = true;
    categoriaTierra:Array<any> = [];
    loadingCategoriaTiera:boolean = true;

    constructor( public _graphicsService: GraphicsService,
                 public _consultaEventosService: ConsultaEventosService,
                 public _consultaTierraService: ConsultaTierraService,
                 public _authService: AuthService) {
        
        this._authService.handleAuthentication();
        this.getGastoTotalEventos();
        this.getGastoTotalTierra();
        this.getEventosTotales();
        this.getcategoriaTierra();
    }

    ngOnInit() { 
        this.reload();
    }

    public reload(){
        setTimeout(()=>{
            window.location.reload();
            this.reload();
        }, 45000);
    }

    public getGastoTotalEventos(){
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', '', '', '', '', '', '').subscribe(PRI => {
            this._consultaEventosService.getGastoTotalEventos(this.busquedaPAN, '', '', '', '', '', '', '').subscribe(PAN => {
                this._consultaEventosService.getGastoTotalEventos(this.busquedaMORENA, '', '', '', '', '', '', '').subscribe(MORENA => {
                    let estructura = {
                        datasets: [{
                            data: [ PRI, PAN, MORENA, 0 ],
                            backgroundColor: [ 'rgba(0, 143, 54, 0.65)', 'rgba(6, 51, 131, 0.65)', 'rgba(179, 40, 43, 0.65)' ],
                            label: ''
                        }],
                        labels: [ 'PRI', 'PAN', 'MORENA' ]
                    };
                    this.eventos = this._graphicsService.graphicDonut('eventos', estructura, 'Gasto total de eventos por alianza');
                    this.loadingEventos = false;
                });
            });
        });
    }

    public getEventosTotales() {
        let cantidadEventosPRI:number = 0;
        let cantidadEventosPAN:number = 0;
        let cantidadEventosMORENA:number = 0;

        this._consultaEventosService.getEstadosEventos(this.busquedaPRI, '', '', '', '', '', '', '').subscribe(estadosPRI => {
            if(estadosPRI){
                for(let estado in estadosPRI){
                    cantidadEventosPRI += estadosPRI[estado].conteo;
                }
            }
            this._consultaEventosService.getEstadosEventos(this.busquedaPAN, '', '', '', '', '', '', '').subscribe(estadosPAN => {
                if(estadosPAN){
                    for(let estado in estadosPAN){
                        cantidadEventosPAN += estadosPAN[estado].conteo;
                    }
                }
                this._consultaEventosService.getEstadosEventos(this.busquedaMORENA, '', '', '', '', '', '', '').subscribe(estadosMORENA => {
                    if(estadosMORENA){
                        for(let estado in estadosMORENA){
                            cantidadEventosMORENA += estadosMORENA[estado].conteo;
                        }
                    }
                    let estructura = {
                        labels: [ 'PRI', 'PAN', 'MORENA' ],
                        datasets: [{
                            backgroundColor: [ 'rgba(0, 143, 54, 0.65)', 'rgba(6, 51, 131, 0.65)', 'rgba(179, 40, 43, 0.65)' ],
                            data: [ cantidadEventosPRI, cantidadEventosPAN, cantidadEventosMORENA, 0 ]
                        }]
                    };
                    
                    this.conteoEventos = this._graphicsService.graphicHorizontal('conteoEventos', estructura, 'Cantidad de eventos por alianza');
                    this.loadingConteoEventos = false;
                });
            });
        });
    }

    /*************** A partir de aqui es Tierra, Eventos no pasar ***************/

    public getGastoTotalTierra() {
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', '', '', '', '', '', '').subscribe(PRI => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPAN, '', '', '', '', '', '', '').subscribe(PAN => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaMORENA, '', '', '', '', '', '', '').subscribe(MORENA => {
                    let estructura = {
                        datasets: [{
                            data: [ PRI, PAN, MORENA ],
                            backgroundColor: [ 'rgba(0, 143, 54, 0.65)', 'rgba(6, 51, 131, 0.65)', 'rgba(179, 40, 43, 0.65)' ],
                            label: ''
                        }],
                        labels: [ 'PRI', 'PAN', 'MORENA' ]
                    };
                    this.tierra = this._graphicsService.graphicDonut('tierra', estructura, 'Gasto total de tierra por alianza');
                    this.loadingTierra = false;
                });
            });
        });
    }

    public getcategoriaTierra() {
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', 'movil', '', '', '', '', '').subscribe(movilPRI => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', 'fija', '', '', '', '', '').subscribe(fijaPRI => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaPAN, '', 'movil', '', '', '', '', '').subscribe(movilPAN => {
                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPAN, '', 'fija', '', '', '', '', '').subscribe(fijaPAN => {
                        this._consultaTierraService.getGastoTotalTierra(this.busquedaMORENA, '', 'movil', '', '', '', '', '').subscribe(movilMORENA => {
                            this._consultaTierraService.getGastoTotalTierra(this.busquedaMORENA, '', 'fija', '', '', '', '', '').subscribe(fijaMORENA => {
                                let estructura = {
                                    labels: ['Móvil', 'Fija'],
                                    datasets: [{
                                        label: 'PRI',
                                        backgroundColor: 'rgba(0, 143, 54, 0.65)',
                                        data: [ movilPRI, fijaPRI, 0]
                                    }, {
                                        label: 'PAN',
                                        backgroundColor: 'rgba(6, 51, 131, 0.65)',
                                        data: [movilPAN, fijaPAN, 0]
                                    }, {
                                        label: 'MORENA',
                                        backgroundColor: 'rgba(179, 40, 43, 0.65)',
                                        data: [ movilMORENA, fijaMORENA, 0]
                                    }]
                                };
                                this.categoriaTierra = this._graphicsService.graphicBar('categoriaTierra', estructura, 'Gasto de tierra por alianza');
                                this.loadingCategoriaTiera = false;
                            });
                        });
                    });
                });
            });
        });
    }
}


