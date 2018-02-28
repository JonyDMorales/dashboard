import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { ConsultaEventosService } from '../../services/consulta.eventos.service';
import { ConsultaTierraService } from '../../services/consulta.tierra.service';

@Component({
    selector: 'app-pri',
    templateUrl: './pri.component.html'
})
export class PriComponent implements OnInit {

    busquedaPRI:string = 'PRI-PVEM-PANAL';
    candidatoPresidente:string = 'presidente';
    candidatoSenador:string = 'senador';
    candidatoDiputado:string = 'diputadoFed';
    candidatoGobernador:string = 'gobernador';
    candidatoAlcalde:string = 'alcalde';

    eventosGastoCandidatos:Array<any> = [];
    eventosEstado:Array<any> = [];
    eventosGastoEstado:Array<any> = [];
    eventosGastoCategoria:Array<any> = [];
    eventosGastoSubcategoriaEstructura:Array<any> = [];
    eventosGastoSubcategoriaAnimacion:Array<any> = [];
    eventosGastoSubcategoriaTransporte:Array<any> = [];
    eventosGastoSubcategoriaProduccion:Array<any> = [];
    eventosGastoSubcategoriaEspectacular:Array<any> = [];
    eventosGastoSubcategoriaUtilitario:Array<any> = [];
    tierraGastoCandidatos:Array<any> = [];
    tierraGastoEstado:Array<any> = [];
    tierraConteoEstado:Array<any> = [];
    tierraGastoCategoria:Array<any> = [];
    tierraGastoSubcategoriaFija:Array<any> = [];
    tierraGastoSubcategoriaMovil:Array<any> = [];

    color0:string = 'rgba(167, 37, 37';
    color1:string = 'rgba(167, 69, 37';
    color2:string = 'rgba(167, 102, 37';
    color3:string = 'rgba(167, 135, 37';
    color4:string = 'rgba(167, 167, 37';
    color5:string = 'rgba(135, 167, 37';
    color6:string = 'rgba(102, 167, 37';
    color7:string = 'rgba(69, 167, 37';
    color8:string = 'rgba(37, 167, 37';
    color9:string = 'rgba(37, 167, 69';
    color10:string = 'rgba(37, 167, 102';
    color11:string = 'rgba(37, 167, 135';	
    color12:string = 'rgba(37, 167, 167';	
    color13:string = 'rgba(37, 135, 167';
    color14:string = 'rgba(36, 116, 166';
    color15:string = 'rgba(37, 102, 167';
    color16:string = 'rgba(37, 69, 167';
    color17:string = 'rgba(37, 37, 167';
    color18:string = 'rgba(69, 37, 167';
    color19:string = 'rgba(102, 37, 167';	
    color20:string = 'rgba(135, 37, 167';	
    color21:string = 'rgba(167, 37, 167';	
    color22:string = 'rgba(167, 37, 135';	
    color23:string = 'rgba(167, 37, 102';	
    color24:string = 'rgba(167, 37, 69';
    color25:string = 'rgba(167, 37, 37';

    constructor(public _graphicsService: GraphicsService,
                public _consultaEventosService: ConsultaEventosService,
                public _consultaTierraService: ConsultaTierraService) {

        this.getEventosGastoTotalCandidato();
        this.getEventosEstados();
        this.getEventosEstadosGasto();
        this.getEventosGastoCategoria();
        this.getEventosGastoSubcategoriaEstructura();
        this.getEventosGastoSubcategoriaAnimacion();
        this.getEventosGastoSubcategoriaTransporte();
        this.getEventosGastoSubcategoriaProduccion();
        this.getEventosGastoSubcategoriaEspectacular();
        this.getEventosGastoSubcategoriaUtilitario();
        this.getGastoTotalTierraCandidato();
        this.getTierraGastoEstado();
        this.getTierraEstados();
        this.getTierraGastoCategoria();
        this.getTierraGastoSubcategoriaFija();
        this.getTierraGastoSubcategoriaMovil();
    }

    ngOnInit() {}

    public getEventosGastoTotalCandidato(){
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, '', '').subscribe(presidente => {
            this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoSenador, '', '').subscribe(senador => {
                this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoDiputado, '', '').subscribe(diputado => {
                    this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoGobernador, '', '').subscribe(gobernador => {
                        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoAlcalde, '', '').subscribe(alcalde => {
                            let estructura = {
                                datasets: [{
                                    data: [ presidente, senador, diputado, gobernador, alcalde ],
                                    backgroundColor: [ this.color0 +' , 0.60)', this.color2 + ', 0.60)',  this.color4 + ', 0.60)', this.color6 + ', 0.60)', this.color8 + ', 0.60)' ],
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

    public getEventosEstadosGasto(){
        this._consultaEventosService.getEstadosEventos(this.busquedaPRI, this.candidatoPresidente, '', '').subscribe(res => {
            if(res){
                let arr:Array<any> = this._graphicsService.sortGasto(res);
                let estructura = {
                    datasets: [{
                        data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                        backgroundColor: [ this.color10 +' , 0.60)', this.color12 + ', 0.60)',  this.color14 + ', 0.60)', this.color16 + ', 0.60)', this.color18 + ', 0.60)' ],
                        label: ''
                    }],
                    labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
                };
                this.eventosGastoEstado = this._graphicsService.graphicPie('eventosGastoEstado', estructura, 'Gasto de eventos por estado');
            }
            
        });
    }

    public getEventosEstados(){
        this._consultaEventosService.getEstadosEventos(this.busquedaPRI, this.candidatoPresidente, '', '').subscribe(res => {
            if(res){
                let arr:Array<any> = this._graphicsService.sortCantidad(res);
                let estructura = {
                    datasets: [{
                        data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                        backgroundColor: [ this.color1 +' , 0.60)', this.color3 + ', 0.60)',  this.color5 + ', 0.60)', this.color7 + ', 0.60)', this.color9 + ', 0.60)' ],
                        label: ''
                    }],
                    labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
                };
                this.eventosEstado = this._graphicsService.graphicPie('eventosEstado', estructura, 'Estados con mayor cantidad de eventos');
            }
        });
    }

    public getEventosGastoCategoria(){
        let gastoEstructura:number = 0;
        let gastoAnimacion:number = 0;
        let gastoTransporte:number = 0;
        let gastoProduccion:number = 0;
        let gastoEspectacular:number = 0;
        let gastoUtilitario:number = 0;
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, 'estructura').subscribe(estructura => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, 'animacion').subscribe(animacion => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, 'transporte').subscribe(transporte => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, 'produccion').subscribe(produccion => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, 'espectacular').subscribe(espectacular => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, 'utilitario').subscribe(utilitario => {
                                for(let key in estructura){
                                    gastoEstructura += estructura[key];
                                }
                                for(let key in animacion){
                                    gastoAnimacion += animacion[key];
                                }
                                for(let key in transporte){
                                    gastoTransporte += transporte[key];
                                }
                                for(let key in produccion){
                                    gastoProduccion += produccion[key];
                                }
                                for(let key in espectacular){
                                    gastoEspectacular += espectacular[key];
                                }
                                for(let key in utilitario){
                                    gastoUtilitario += utilitario[key];
                                }
                                let estruct = {
                                    datasets: [{
                                        data: [ gastoEstructura, gastoAnimacion, gastoTransporte, gastoProduccion, gastoEspectacular, gastoUtilitario ],
                                        backgroundColor: [ this.color11 +' , 0.60)', this.color13 + ', 0.60)',  this.color15 + ', 0.60)', this.color17 + ', 0.60)', this.color19 + ', 0.60)', this.color21 + ', 0.60)' ],
                                        label: ''
                                    }],
                                    labels: [ 'Estructura', 'Animación', 'Transporte', 'Producción', 'Espectacular', 'Utilitario' ]
                                };
                                this.eventosGastoCategoria = this._graphicsService.graphicBar('eventosGastoCategoria', estruct, 'Gasto total de eventos por categoria');
                            });
                        });
                    });
                });
            });
        });
    }

    public getEventosGastoSubcategoriaEstructura(){
        let categoria = 'estructura';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria).subscribe(estructura => {
        let estruct = {
            datasets: [{
                data: Object.values(estructura),
                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.5)', this.color6+' , 0.5)', this.color7 + ', 0.5)',  this.color8 + ', 0.5)', this.color9 + ', 0.5)', this.color10 + ', 0.5)', this.color11 + ', 0.5)' ],
                label: ''
            }],
            labels: [ 'Arañas', 'Baños Públicos', 'Carpas', 'Escenario', 'Gradas', 'Mampara', 'Mesas', 'Otros', 'Sillas', 'Sillones', 'Templete', 'Vallas' ]
        };
        this.eventosGastoSubcategoriaEstructura = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEstructura', estruct, 'Gasto de estructura');
       });
        
    }

    public getEventosGastoSubcategoriaAnimacion(){
        let categoria = 'animacion';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria).subscribe(animacion => {
            let estruct = {
                datasets: [{
                    data: Object.values(animacion),
                    backgroundColor: [ this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 + ',0.40)', this.color16 + ',0.40)', this.color17 + ', 0.40)' ],
                    label: ''
                }],
                labels: [ 'Animador/Maestro de Ceremonias', 'Artistas', 'Edecanes', 'Grupos Musicales/Djs', 'Otros' ]
            };
            this.eventosGastoSubcategoriaAnimacion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaAnimacion', estruct, 'Gasto de animacion');
        });
        
    }

    public getEventosGastoSubcategoriaTransporte(){
        let categoria = 'transporte';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria).subscribe(transporte => {
            let estruct = {
                datasets: [{
                    data: Object.values(transporte),
                    backgroundColor: [ this.color18 +' , 0.40)', this.color19 + ', 0.40)',  this.color20 + ', 0.40)', this.color21 + ',0.40)', this.color22 + ',0.40)', this.color23 + ', 0.40)' ],
                    label: ''
                }],
                labels: [ 'Automóviles', 'Camiones', 'Camionetas', 'Combi/Microbus', 'Otros', 'Taxi' ]
            };
            this.eventosGastoSubcategoriaTransporte = this._graphicsService.graphicRadar('eventosGastoSubcategoriaTransporte', estruct, 'Gasto de transporte');
        });
    }

    public getEventosGastoSubcategoriaProduccion(){ 
        let categoria = 'produccion';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria).subscribe(produccion => {
            let estruct = {
                datasets: [{
                data: Object.values(produccion),
                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 + ',0.40)' ],
                label: ''
                }],
                labels: [ 'Computadoras', 'Consola de Audio', 'Cámaras de Video', 'Dron', 'Equipo de Audio', 'Gruas de cámara', 'Luces', 'Mermas de Producción', 'Micrófonos', 'Otros', 'Pantallas', 'Personal de Seguridad', 'Plantas de Luz', 'Proyectores', 'Servicio Medico', 'Video Walls' ]
            };
            this.eventosGastoSubcategoriaProduccion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaProduccion', estruct, 'Gasto de produccion');
        });
        
    }

    public getEventosGastoSubcategoriaEspectacular(){
        let categoria = 'espectacular';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria).subscribe(espectacular => {
            let estruct = {
                datasets: [{
                data: Object.values(espectacular),
                backgroundColor: [ this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)' ],
                label: ''
                }],
                labels: [ 'Buzones/Cajas de Luz', 'Carteleras', 'Columnas', 'Inflables Promocionales', 'Lonas', 'Marquesinas', 'Muebles Urbanos', 'Muros', 'Otros', 'Panorámicos', 'Parabuses', 'Pendones', 'Puentes', 'Vallas', 'Vehículo de Transporte' ]
            };
            this.eventosGastoSubcategoriaEspectacular = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEspectacular', estruct, 'Gasto de espectaculares');
        });
    }

    public getEventosGastoSubcategoriaUtilitario(){
        let categoria = 'utilitario';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria).subscribe(utilitario => {
        let estruct = {
            datasets: [{
            data: Object.values(utilitario),
            backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)', this.color5 +' , 0.40)', this.color6 +' , 0.40)', this.color7 +' , 0.40)' ],
            label: ''
            }],
            labels: [ 'Abanicos', 'Aguas', 'Banderas', 'Banderines', 'Banderolas', 'Bolsas', 'Botones', 'Camisas', 'Chaleco', 'Chamarras', 'Cobija', 'Gallardetes', 'Gorras', 'Impermeable', 'Lonches', 'Mandiles', 'Mangas', 'Mantas igual o mayor a 12 MTS', 'Mantas menores a 12 MTS', 'Microperforadores', 'Mochilas', 'Otros', 'Paliacates', 'Playeras', 'Pulseras', 'Refrescos', 'Sombrillas', 'Stikers', 'Sudadera', 'Tortilleros', 'Tripticos', 'Vasos', 'Vinilonas', 'Volantes'   ]
        };
        this.eventosGastoSubcategoriaUtilitario = this._graphicsService.graphicRadar('eventosGastoSubcategoriaUtilitario', estruct, 'Gasto de utilitario');
        });
    }

    /*************** Aqui empieza Tierra, Eventos no pasar ***************/

    public  getGastoTotalTierraCandidato() {
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, '', '').subscribe(presidente => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoSenador, '', '').subscribe(senador => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoDiputado, '', '').subscribe(diputado => {
                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoGobernador, '', '').subscribe(gobernador => {
                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoAlcalde, '','').subscribe(alcalde => {
                            const estructura = {
                                datasets: [{
                                    data: [ presidente, senador, diputado, gobernador, alcalde ],
                                    backgroundColor: [ this.color0 +' , 0.6)', this.color2 + ', 0.6)',  this.color4 + ', 0.6)', this.color6 + ', 0.6)', this.color8 + ', 0.6)' ],
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

    public getTierraGastoEstado() {
        this._consultaTierraService.getEstadosTierra(this.busquedaPRI, this.candidatoPresidente, '', '').subscribe(res => {
            if(res){
                let arr:Array<any> = this._graphicsService.sortGasto(res);
                const estructura = {
                    datasets: [{
                        data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                        backgroundColor: [ this.color10 +' , 0.6)', this.color12 + ', 0.6)',  this.color14 + ', 0.6)', this.color16 + ', 0.6)', this.color18 + ', 0.6)' ],
                        label: ''
                    }],
                    labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
                };
                this.tierraGastoEstado = this._graphicsService.graphicPie('tierraGastoEstado', estructura, 'Gasto de tierra por estado');

            }
        });
    }

    public getTierraEstados(){
        this._consultaTierraService.getEstadosTierra(this.busquedaPRI, this.candidatoPresidente, '', '').subscribe(res =>{
            if(res){
                let arr:Array<any> = this._graphicsService.sortCantidad(res);
                let estructura = {
                    datasets: [{
                        data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                        backgroundColor: [ this.color1 +' , 0.6)', this.color3 + ', 0.6)',  this.color5 + ', 0.6)', this.color7 + ', 0.6)', this.color9 + ', 0.6)' ],
                        label: ''
                    }],
                    labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
                };
                this.tierraConteoEstado = this._graphicsService.graphicPie('tierraConteoEstado', estructura, 'Estados con mayor cantidad de tierra');
            }
        });
    }

    public getTierraGastoCategoria() {
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', 'Movil', '').subscribe(movilPRI => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', 'Fija', '').subscribe(fijaPRI => {
                const estructura = {
                    labels: ['Móvil', 'Fija'],
                    datasets: [{
                        label: 'PRI',
                        backgroundColor: [ this.color11 +' , 0.60)', this.color13 + ', 0.60)' ],
                        data: [movilPRI, fijaPRI]
                    }]
                };
                this.tierraGastoCategoria = this._graphicsService.graphicBar('tierraGastoCategoria', estructura, 'Gasto de tierra por categoria');
            });
        });
    }

    public getTierraGastoSubcategoriaFija(){
        const categoria = 'Fija';
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Espectaculares').subscribe(Espectaculares => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Bardas').subscribe(Bardas => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Lonas').subscribe(Lonas => {
                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Puentes').subscribe(Puentes => {
                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Pendones').subscribe(Pendones => {
                            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Kioscos').subscribe(Kioscos => {
                                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Carteles').subscribe(Carteles => {
                                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Parabuses').subscribe(Parabuses => {
                                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Mobiliario/EspacioPublico').subscribe(Mobiliario => {
                                            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Volantes y Pegatinas').subscribe(Volantes => {
                                                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Valla Impresa').subscribe(VallaI => {
                                                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Valla Digital').subscribe(VallaD => {
                                                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Pantallas Fijas').subscribe(Pantallas => {
                                                            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Propaganda en Columnas').subscribe(Propaganda => {
                                                                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Buzones').subscribe(Buzones => {
                                                                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Cajas de Luz').subscribe(Cajas => {
                                                                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Marquesinas').subscribe(Marquesinas => {
                                                                            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Muebles Urbanos').subscribe(Muebles => {
                                                                                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Espectaculares de Pantallas Digitales').subscribe(EspectacularesP => {
                                                                                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Mantas (Igual o Mayor a 12 MTS)').subscribe(Mantas12 => {
                                                                                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Mantas (Menores a 12 MTS)').subscribe(MantasM12 => {
                                                                                            const estruct = {
                                                                                                datasets: [{
                                                                                                data: [ Espectaculares, Bardas, Lonas, Puentes, Pendones, Kioscos, Carteles, Parabuses, Mobiliario, Volantes, VallaI, VallaD, Pantallas, Propaganda, Buzones, Cajas, Marquesinas, Muebles, EspectacularesP, Mantas12, MantasM12  ],
                                                                                                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)' ],
                                                                                                label: ''
                                                                                                }],
                                                                                                labels: [ 'Espectaculares', 'Bardas', 'Lonas', 'Puentes', 'Pendones', 'Kioscos', 'Carteles', 'Parabuses', 'Mobiliario/Espacio Publico', 'Volantes y Pegatinas', 'Valla Impresa', 'Valla Digital', 'Pantallas Fijas', 'Propaganda en Columnas', 'Buzones', 'Cajas de Luz', 'Marquesinas', 'Muebles Urbanos', 'Espectaculares de Pantallas Digitales', 'Mantas (Igual o Mayor a 12 MTS)', 'Mantas (Menores a 12 MTS)'  ]
                                                                                            };
                                                                                            this.tierraGastoSubcategoriaFija = this._graphicsService.graphicRadar('tierraGastoSubcategoriaFija', estruct, 'Gasto de fija');
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });  
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    public getTierraGastoSubcategoriaMovil(){
        let categoria = 'Movil';
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Transporte Público(combis, micros, camiones)').subscribe(Transporte => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Vehículos Publicidad(pantallas o lonas)').subscribe(Vehiculos => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Particulares').subscribe(Particulares => {
                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Taxis').subscribe(Taxis => {
                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Metro (dentro de vagones)').subscribe(Metro => {
                            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Brigadas (reparten utilitarios,en cruceros pueden abrir lonas)').subscribe(Brigadas => {
                                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Bicicletas/Bicitaxis/Mototaxis').subscribe(Bicicletas => {
                                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Perifoneo').subscribe(Perifoneo => {
                                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Pantallas Moviles').subscribe(Pantallas => {
                                            const estruct = {
                                                datasets: [{
                                                data: [ Transporte, Vehiculos, Particulares, Taxis, Metro, Brigadas, Bicicletas, Perifoneo, Pantallas ],
                                                backgroundColor: [ this.color21 +' , 0.40)', this.color22 + ', 0.40)',  this.color23 + ', 0.40)', this.color24 + ',0.40)', this.color25 + ',0.40)', this.color0 + ', 0.40)', this.color1 + ', 0.40)', this.color2 + ', 0.40)', this.color3 + ', 0.40)' ],
                                                label: ''
                                                }],
                                                labels: [ 'Transporte Público(combis, micros, camiones)', 'Vehículos Publicidad(pantallas o lonas)', 'Particulares', 'Taxis', 'Metro (dentro de vagones)', 'Brigadas (repartes utilitarios, en cruceros pueden abrir lonas)', 'Bicicletas/Bicitaxis/Mototaxis', 'Perifoneo', 'Pantallas Móviles' ]
                                            };
                                            this.tierraGastoSubcategoriaMovil = this._graphicsService.graphicRadar('tierraGastoSubcategoriaMovil', estruct, 'Gasto de Movil');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}
