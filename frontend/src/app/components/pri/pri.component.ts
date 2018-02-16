import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { ConsultaEventosService } from '../../services/consulta.eventos.service';
import { ConsultaTierraService } from '../../services/consulta.tierra.service';

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
    eventosGastoSubcategoriaEstructura = [];
    eventosGastoSubcategoriaAnimacion = [];
    eventosGastoSubcategoriaTransporte = [];
    eventosGastoSubcategoriaProduccion = [];
    eventosGastoSubcategoriaEspectacular = [];
    eventosGastoSubcategoriaUtilitario = [];
    tierraGastoCandidatos = [];
    tierraGastoEstado = [];
    tierraConteoEstado = [];
    tierraGastoCategoria = [];
    tierraGastoSubcategoriaFija = [];
    tierraGastoSubcategoriaMovil = [];

    color0 = 'rgba(167, 37, 37';
    color1 = 'rgba(167, 69, 37';
    color2 = 'rgba(167, 102, 37';
    color3 = 'rgba(167, 135, 37';
    color4 = 'rgba(167, 167, 37';
    color5 = 'rgba(135, 167, 37';
    color6 = 'rgba(102, 167, 37';
    color7 = 'rgba(69, 167, 37';
    color8 = 'rgba(37, 167, 37';
    color9 = 'rgba(37, 167, 69';
    color10 = 'rgba(37, 167, 102';
    color11 = 'rgba(37, 167, 135';	
    color12 = 'rgba(37, 167, 167';	
    color13 = 'rgba(37, 135, 167';
    color14 = 'rgba(36, 116, 166';
    color15 = 'rgba(37, 102, 167';
    color16 = 'rgba(37, 69, 167';
    color17 = 'rgba(37, 37, 167';
    color18 = 'rgba(69, 37, 167';
    color19 = 'rgba(102, 37, 167';	
    color20 = 'rgba(135, 37, 167';	
    color21 = 'rgba(167, 37, 167';	
    color22 = 'rgba(167, 37, 135';	
    color23 = 'rgba(167, 37, 102';	
    color24 = 'rgba(167, 37, 69';
    color25 = 'rgba(167, 37, 37';

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
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(presidente => {
            this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoSenador, '').subscribe(senador => {
                this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoDiputado, '').subscribe(diputado => {
                    this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoGobernador, '').subscribe(gobernador => {
                        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoAlcalde, '').subscribe(alcalde => {
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
        this._consultaEventosService.getGastoEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
            const arr = this.sortJSON(res);
            const estructura = {
                datasets: [{
                    data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                    backgroundColor: [ this.color10 +' , 0.60)', this.color12 + ', 0.60)',  this.color14 + ', 0.60)', this.color16 + ', 0.60)', this.color18 + ', 0.60)' ],
                    label: ''
                }],
                labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
            };
            this.eventosGastoEstado = this._graphicsService.graphicPie('eventosGastoEstado', estructura, 'Gasto de eventos por estado');
        });
    }

    public getEventosEstados(){
        this._consultaEventosService.getConteoEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
            const arr = this.sortJSON(res);
            const estructura = {
                datasets: [{
                    data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                    backgroundColor: [ this.color1 +' , 0.60)', this.color3 + ', 0.60)',  this.color5 + ', 0.60)', this.color7 + ', 0.60)', this.color9 + ', 0.60)' ],
                    label: ''
                }],
                labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
            };
            this.eventosEstado = this._graphicsService.graphicPie('eventosEstado', estructura, 'Estados con mayor cantidad de eventos');
        });
    }

    public getEventosGastoCategoria(){
        console.log(this.getEventosGastoSubcategoriaEstructura());
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, 'estructura').subscribe(estructura => {
            this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, 'animacion').subscribe(animacion => {
                this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, 'transporte').subscribe(transporte => {
                    this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, 'produccion').subscribe(produccion => {
                        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, 'espectacular').subscribe(espectacular => {
                            this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, 'utilitario').subscribe(utilitario => {
                                const estruct = {
                                    datasets: [{
                                        data: [ estructura, animacion, transporte, produccion, espectacular, utilitario ],
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
        const subcategoria = 'estructura';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'arañas').subscribe(arañas => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'baños públicos').subscribe(baños => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'carpas').subscribe(carpas => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'escenario').subscribe(escenario => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'gradas').subscribe(gradas => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this. candidatoPresidente, subcategoria, 'mampara').subscribe(mampara => {
                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'mesas').subscribe(mesas => {
                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'otros').subscribe(otros => {
                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'sillas').subscribe(sillas =>{
                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'sillones').subscribe(sillones => {
                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'templete').subscribe(templete => {
                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'vallas').subscribe(vallas => {
                                                        const estruct = {
                                                            datasets: [{
                                                                data: [ arañas, baños, carpas, escenario, gradas, mampara, mesas, otros, sillas, sillones, templete, vallas ],
                                                                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.5)', this.color6+' , 0.5)', this.color7 + ', 0.5)',  this.color8 + ', 0.5)', this.color9 + ', 0.5)', this.color10 + ', 0.5)', this.color11 + ', 0.5)' ],
                                                                label: ''
                                                            }],
                                                            labels: [ 'Arañas', 'Baños Públicos', 'Carpas', 'Escenario', 'Gradas', 'Mampara', 'Mesas', 'Otros', 'Sillas', 'Sillones', 'Templete', 'Vallas' ]
                                                        };
                                                        this.eventosGastoSubcategoriaEstructura = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEstructura', estruct, 'Gasto de estructura');
                                                        return arañas + baños + carpas + escenario + gradas + mampara + mesas + otros + sillas + sillones + templete + vallas;
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

    public getEventosGastoSubcategoriaAnimacion(){
        const subcategoria = 'animacion';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'animador/maestro de ceremonias').subscribe(animador => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'artistas').subscribe(artistas => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'edecanes').subscribe(edecanes => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'grupos musicales / djs').subscribe(grupos => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'otros').subscribe(otros => {
                            const estruct = {
                                datasets: [{
                                    data: [ animador, artistas, edecanes, grupos, otros ],
                                    backgroundColor: [ this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 + ',0.40)', this.color16 + ',0.40)', this.color17 + ', 0.40)' ],
                                    label: ''
                                }],
                                labels: [ 'Animador/Maestro de Ceremonias', 'Artistas', 'Edecanes', 'Grupos Musicales/Djs', 'Otros' ]
                            };
                            this.eventosGastoSubcategoriaAnimacion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaAnimacion', estruct, 'Gasto de animacion');
                        });
                    });
                });
            });
        });
    }

    public getEventosGastoSubcategoriaTransporte(){
        const subcategoria = 'transporte';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'automóviles').subscribe(automoviles => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'camiones').subscribe(camiones => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'camionetas').subscribe(camionetas => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'combi/microbus').subscribe(combimicrobus => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'otros').subscribe(otros => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'taxi').subscribe(taxi => {
                                const estruct = {
                                    datasets: [{
                                        data: [ automoviles, camiones, camionetas, combimicrobus, otros, taxi ],
                                        backgroundColor: [ this.color18 +' , 0.40)', this.color19 + ', 0.40)',  this.color20 + ', 0.40)', this.color21 + ',0.40)', this.color22 + ',0.40)', this.color23 + ', 0.40)' ],
                                        label: ''
                                    }],
                                    labels: [ 'Automóviles', 'Camiones', 'Camionetas', 'Combi/Microbus', 'Otros', 'Taxi' ]
                                };
                                this.eventosGastoSubcategoriaTransporte = this._graphicsService.graphicRadar('eventosGastoSubcategoriaTransporte', estruct, 'Gasto de transporte');
                            });
                        });
                    });
                });
            });
        });
    }

    public getEventosGastoSubcategoriaProduccion(){ 
        const subcategoria = 'produccion';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'computadoras').subscribe(computadoras => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'consola de audio').subscribe(consoladeaudio => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'cámaras de video').subscribe(camarasdevideo => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'dron').subscribe(dron => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'equipo de audio').subscribe(equipodeaudio => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this. candidatoPresidente, subcategoria, 'gruas de cámara').subscribe(gruasdecamara => {
                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'luces').subscribe(luces => {
                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'mermas de producción').subscribe(mermasdeproduccion => {
                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'micrófonos').subscribe(microfonos =>{
                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'otros').subscribe(otros => {
                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'pantallas').subscribe(pantallas => {
                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'personal de seguridad').subscribe(personaldeseguridad => {
                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'plantas de luz').subscribe(plantasdeluz=> {
                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'proyectores').subscribe(proyectores => {
                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'servicio médico').subscribe(serviciomedico => {
                                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'video walls').subscribe(videowalls => {
                                                                        const estruct = {
                                                                            datasets: [{
                                                                            data: [ computadoras, consoladeaudio, camarasdevideo, dron, equipodeaudio, gruasdecamara, luces, mermasdeproduccion, microfonos, otros, pantallas, personaldeseguridad, plantasdeluz, proyectores, serviciomedico, videowalls ],
                                                                            backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 + ',0.40)' ],
                                                                            label: ''
                                                                            }],
                                                                            labels: [ 'Computadoras', 'Consola de Audio', 'Cámaras de Video', 'Dron', 'Equipo de Audio', 'Gruas de cámara', 'Luces', 'Mermas de Producción', 'Micrófonos', 'Otros', 'Pantallas', 'Personal de Seguridad', 'Plantas de Luz', 'Proyectores', 'Servicio Medico', 'Video Walls' ]
                                                                        };
                                                                        this.eventosGastoSubcategoriaProduccion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaProduccion', estruct, 'Gasto de produccion');
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

    public getEventosGastoSubcategoriaEspectacular(){
        const categoria = 'espectacular';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'buzones/cajas de luz').subscribe(buzonescajasdeluz => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'carteleras').subscribe(carteleras => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'columnas').subscribe(columnas => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'inflables-promocionales').subscribe(inflablespromocionales => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'lonas').subscribe(lonas => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'marquesinas').subscribe(marquesinas => {
                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'muebles urbanos').subscribe(mueblesurbanos => {
                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'muros').subscribe(muros => {
                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'otros').subscribe(otros => {
                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'panorámicos').subscribe(panoramicos => {
                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'parabuses').subscribe(parabuses => {
                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'pendones').subscribe(pendones => {
                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'puentes').subscribe(puentes => {
                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'vallas').subscribe(vallas => {
                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'vehículo de transporte').subscribe(vehiculodetransporte => {
                                                                    const estruct = {
                                                                        datasets: [{
                                                                        data: [ buzonescajasdeluz, carteleras, columnas, inflablespromocionales, lonas, marquesinas, mueblesurbanos, muros, otros, panoramicos, parabuses, pendones, puentes, vallas, vehiculodetransporte ],
                                                                        backgroundColor: [ this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)' ],
                                                                        label: ''
                                                                        }],
                                                                        labels: [ 'Buzones/Cajas de Luz', 'Carteleras', 'Columnas', 'Inflables Promocionales', 'Lonas', 'Marquesinas', 'Muebles Urbanos', 'Muros', 'Otros', 'Panorámicos', 'Parabuses', 'Pendones', 'Puentes', 'Vallas', 'Vehículo de Transporte' ]
                                                                    };
                                                                    this.eventosGastoSubcategoriaEspectacular = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEspectacular', estruct, 'Gasto de espectaculares');
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

    public getEventosGastoSubcategoriaUtilitario(){
        const categoria = 'utilitario';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'abanicos').subscribe(abanicos => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'aguas').subscribe(aguas => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'banderas').subscribe(banderas => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'banderines').subscribe(banderines => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'banderolas').subscribe(banderolas => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'bolsas').subscribe(bolsas => {
                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'botones').subscribe(botones => {
                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'camisas').subscribe(camisas => {
                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'chaleco').subscribe(chaleco => {
                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'chamarras').subscribe(chamarras => {
                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'cobija').subscribe(cobija => {
                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'gallardetes').subscribe(gallardetes => {
                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'gorras').subscribe(gorras => {
                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'impermeable').subscribe(impermeable =>     {
                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'lonches').subscribe(lonches => {
                                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'mandiles').subscribe(mandiles => {
                                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'mangas').subscribe(mangas => {
                                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'mantas (igual o mayor a 12 mts)').subscribe(mantasigualomayora12mts => {
                                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'mantas (menores a 12 mts)').subscribe(mantasmenoresa12mts => {
                                                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'microperforadores').subscribe(microperforadores => {
                                                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'mochilas').subscribe(mochilas => {
                                                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'otros').subscribe(otros => {
                                                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'paliacates').subscribe(paliacates => {
                                                                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'playeras').subscribe(playeras => {
                                                                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'pulseras').subscribe(pulseras => {
                                                                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'refrescos').subscribe(refrescos => {
                                                                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'sombrillas').subscribe(sombrillas => {
                                                                                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'stikers').subscribe(stikers => {
                                                                                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'sudadera').subscribe(sudadera => {
                                                                                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'tortilleros').subscribe(tortilleros => {
                                                                                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'tripticos').subscribe(tripticos => {
                                                                                                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'vasos').subscribe(vasos => {
                                                                                                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'vinilonas').subscribe(vinilonas => {
                                                                                                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, categoria, 'volantes').subscribe(volantes => {
                                                                                                                                                const estruct = {
                                                                                                                                                    datasets: [{
                                                                                                                                                    data: [ abanicos, aguas, banderas, banderines, banderolas, bolsas, botones, camisas, chaleco, chamarras, cobija, gallardetes, gorras, impermeable, lonches, mandiles, mangas, mantasigualomayora12mts, mantasmenoresa12mts, microperforadores, mochilas, otros, paliacates, playeras, pulseras, refrescos, sombrillas, stikers, sudadera, tortilleros, tripticos, vasos, vinilonas, volantes ],
                                                                                                                                                    backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)', this.color5 +' , 0.40)', this.color6 +' , 0.40)', this.color7 +' , 0.40)' ],
                                                                                                                                                    label: ''
                                                                                                                                                    }],
                                                                                                                                                    labels: [ 'Abanicos', 'Aguas', 'Banderas', 'Banderines', 'Banderolas', 'Bolsas', 'Botones', 'Camisas', 'Chaleco', 'Chamarras', 'Cobija', 'Gallardetes', 'Gorras', 'Impermeable', 'Lonches', 'Mandiles', 'Mangas', 'Mantas igual o mayor a 12 MTS', 'Mantas menores a 12 MTS', 'Microperforadores', 'Mochilas', 'Otros', 'Paliacates', 'Playeras', 'Pulseras', 'Refrescos', 'Sombrillas', 'Stikers', 'Sudadera', 'Tortilleros', 'Tripticos', 'Vasos', 'Vinilonas', 'Volantes'   ]
                                                                                                                                                };
                                                                                                                                                this.eventosGastoSubcategoriaUtilitario = this._graphicsService.graphicRadar('eventosGastoSubcategoriaUtilitario', estruct, 'Gasto de utilitario');
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
        this._consultaTierraService.getGastoCategoriaTierra(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
            const arr = this.sortJSON(res);
            const estructura = {
                datasets: [{
                    data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                    backgroundColor: [ this.color10 +' , 0.6)', this.color12 + ', 0.6)',  this.color14 + ', 0.6)', this.color16 + ', 0.6)', this.color18 + ', 0.6)' ],
                    label: ''
                }],
                labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
            };
            this.tierraGastoEstado = this._graphicsService.graphicPie('tierraGastoEstado', estructura, 'Gasto de tierra por estado');
        });
    }

    public getTierraEstados(){
        this._consultaTierraService.getConteoEstado(this.busquedaPRI, this.candidatoPresidente, '').subscribe(conteo =>{
            const arr = this.sortJSON(conteo);
            const estructura = {
                datasets: [{
                    data: [ arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1] ],
                    backgroundColor: [ this.color1 +' , 0.6)', this.color3 + ', 0.6)',  this.color5 + ', 0.6)', this.color7 + ', 0.6)', this.color9 + ', 0.6)' ],
                    label: ''
                }],
                labels: [ arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0] ]
            };
            this.tierraConteoEstado = this._graphicsService.graphicPie('tierraConteoEstado', estructura, 'Estados con mayor cantidad de tierra');
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

    public sortJSON(json) {
        const array = [];
        for(const a in json){
            array.push([a,json[a]])
        }

        array.sort(function(a, b) {return a[1] - b[1]});
        return array.reverse();
    }
}
