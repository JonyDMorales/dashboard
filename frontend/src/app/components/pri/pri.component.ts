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
    tierraGastoCandidatos = [];
    tierraGastoEstado = [];
    tierraGastoSubcategoriaFija = [];
    tierraGastoSubcategoriaMovil = [];


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
        this.getGastoTotalTierraCandidato();
        this.getTierraGastoEstado();
        this.getTierraGastoSubcategoriaFija();
        this.getTierraGastoSubcategoriaMovil();
    }

    ngOnInit() {}

    public getEventosGastoTotalCandidato() {
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(presidente => {
            this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoSenador, '').subscribe(senador => {
                this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoDiputado, '').subscribe(diputado => {
                    this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoGobernador, '').subscribe(gobernador => {
                        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, this.candidatoAlcalde, '').subscribe(alcalde => {
                            const estructura = {
                                datasets: [{
                                    data: [ presidente, senador, diputado, gobernador, alcalde ],
                                    backgroundColor: [ '#80008f36', '#00063383', '#33e60000', '#008f36', '#5c5c8a' ],
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

    public getEventosEstados() {
        this._consultaEventosService.getConteoEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
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

    public getEventosEstadosGasto() {
        this._consultaEventosService.getGastoEventos(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
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

    public getEventosGastoCategoria() {
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', 'estructura').subscribe(estructura => {
            this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', 'animacion').subscribe(animacion => {
                this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', 'transporte').subscribe(transporte => {
                    this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', 'produccion').subscribe(produccion => {
                        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', 'espectacular').subscribe(espectacular => {
                            this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', 'utilitario').subscribe(utilitario => {
                                const estruct = {
                                    datasets: [{
                                        data: [ estructura, animacion, transporte, produccion, espectacular, utilitario ],
                                        backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000'],
                                        label: ''
                                    }],
                                    labels: [ 'Estructura', 'Animacion', 'Transporte', 'Produccion', 'Espectacular', 'Utilitario' ]
                                };
                                this.eventosGastoCategoria = this._graphicsService.graphicBar('eventosGastoCategoria', estruct, 'Gasto total de eventos por candidato');
                            });
                        });
                    });
                });
            });
        });
    }

    public getEventosGastoSubcategoriaEstructura() {
        const subcategoria = 'estructura';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'arañas').subscribe(arañas => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'baños publicos').subscribe(baños => {
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
                                                                backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000'],
                                                                label: ''
                                                            }],
                                                            labels: [ 'Arañas', 'baños', 'carpas', 'escenario', 'gradas', 'mampara', 'mesas', 'otros', 'sillas', 'sillones', 'templete', 'vallas' ]
                                                        };
                                                        this.eventosGastoSubcategoriaEstructura = this._graphicsService.graphicBar('eventosGastoSubcategoriaEstructura', estruct, 'Gasto de estructura');
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

    public getEventosGastoSubcategoriaAnimacion() {
        const subcategoria = 'animacion';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'animador / maestro de ceremonias').subscribe(animador => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'artistas').subscribe(artistas => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'edecanes').subscribe(edecanes => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'grupos musicales / djs').subscribe(grupos => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'otros').subscribe(otros => {
                            const estruct = {
                                datasets: [{
                                    data: [ animador, artistas, edecanes, grupos, otros ],
                                    backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000'],
                                    label: ''
                                }],
                                labels: [ 'animador', 'artistas', 'edecanes', 'grupos', 'otros' ]
                            };
                            this.eventosGastoSubcategoriaAnimacion = this._graphicsService.graphicBar('eventosGastoSubcategoriaAnimacion', estruct, 'Gasto de animacion');
                        });
                    });
                });
            });
        });
    }

    public getEventosGastoSubcategoriaTransporte() {
        const subcategoria = 'transporte';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'automoviles').subscribe(automoviles => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'camiones').subscribe(camiones => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'camionetas').subscribe(camionetas => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'combi/microbus').subscribe(combimicrobus => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'otros').subscribe(otros => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'taxi').subscribe(taxi => {
                                const estruct = {
                                    datasets: [{
                                        data: [ automoviles, camiones, camionetas, combimicrobus, otros, taxi ],
                                        backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000'],
                                        label: ''
                                    }],
                                    labels: [ 'automoviles', 'camiones', 'camionetas', 'combimicrobus', 'otros', 'taxi' ]
                                };
                                this.eventosGastoSubcategoriaTransporte = this._graphicsService.graphicBar('eventosGastoSubcategoriaTransporte', estruct, 'Gasto de transporte');
                            });
                        });
                    });
                });
            });
        });
    }

    public getEventosGastoSubcategoriaProduccion() {
        const subcategoria = 'produccion';
        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'computadoras').subscribe(computadoras => {
            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'consola de audio').subscribe(consoladeaudio => {
                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'camaras de video').subscribe(camarasdevideo => {
                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'dron').subscribe(dron => {
                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'equipo de audio').subscribe(equipodeaudio => {
                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this. candidatoPresidente, subcategoria, 'gruas de camara').subscribe(gruasdecamara => {
                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'luces').subscribe(luces => {
                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'mermas de produccion').subscribe(mermasdeproduccion => {
                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'microfonos').subscribe(microfonos =>{
                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'otros').subscribe(otros => {
                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'pantallas').subscribe(pantallas => {
                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'personal de seguridad').subscribe(personaldeseguridad => {
                                                        this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'plantas de luz').subscribe(plantasdeluz=> {
                                                            this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'proyectores').subscribe(proyectores => {
                                                                this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'servicio medico').subscribe(serviciomedico => {
                                                                    this._consultaEventosService.getGastoSubcategoria(this.busquedaPRI, this.candidatoPresidente, subcategoria, 'video walls').subscribe(videowalls => {
                                                                        const estruct = {
                                                                            datasets: [{
                                                                            data: [ computadoras, consoladeaudio, camarasdevideo, dron, equipodeaudio, gruasdecamara, luces, mermasdeproduccion, microfonos, otros, pantallas, personaldeseguridad, plantasdeluz, proyectores, serviciomedico, videowalls ],
                                                                            backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000', '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000', '#008f36', '#063383', '#e60000', '#008f36'],
                                                                            label: ''
                                                                            }],
                                                                            labels: [ 'computadoras', 'consoladeaudio', 'camarasdevideo', 'dron', 'equipodeaudio', 'gruasdecamara', 'luces', 'mermasdeproduccion', 'microfonos', 'otros', 'pantallas', 'personaldeseguridad', 'plantasdeluz', 'proyectores', 'serviciomedico', 'videowalls' ]
                                                                        };
                                                                        this.eventosGastoSubcategoriaProduccion = this._graphicsService.graphicBar('eventosGastoSubcategoriaProduccion', estruct, 'Gasto de produccion');
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

    public getTierraGastoEstado() {
        this._consultaTierraService.getGastoCategoriaTierra(this.busquedaPRI, this.candidatoPresidente, '').subscribe(res => {
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
                                                                                                backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000', '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000', '#008f36', '#063383', '#e60000', '#008f36', '#008f36', '#008f36', '#008f36', '#008f36', '#CC000000' ],
                                                                                                label: ''
                                                                                                }],
                                                                                                labels: [ 'Espectaculares', 'Bardas', 'Lonas', 'Puentes', 'Pendones', 'Kioscos', 'Carteles', 'Parabuses', 'Mobiliario', 'Volantes', 'VallaI', 'VallaD', 'Pantallas', 'Propaganda', 'Buzones', 'Cajas', 'Marquesinas', 'Muebles', 'EspectacularesP', 'Mantas12', 'MantasM12'  ]
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
        const categoria = 'movil';
        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Transporte Público(combis, micros, camiones)').subscribe(Transporte => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Vehículos Publicidad(pantallas o lonas)').subscribe(Vehiculos => {
                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Particulares').subscribe(Particulares => {
                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Taxis').subscribe(Taxis => {
                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Metro (dentro de vagones)').subscribe(Metro => {
                            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Brigadas (repartes utilitarios, en cruceros pueden abrir lonas)').subscribe(Brigadas => {
                                this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Bicicletas/Bicitaxis/Mototaxis').subscribe(Bicicletas => {
                                    this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Perifoneo').subscribe(Perifoneo => {
                                        this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, this.candidatoPresidente, categoria, 'Pantallas Móviles').subscribe(Pantallas => {
                                            const estruct = {
                                                datasets: [{
                                                data: [ Transporte, Vehiculos, Particulares, Taxis, Metro, Brigadas, Bicicletas, Perifoneo, Pantallas ],
                                                backgroundColor: [ '#008f36', '#063383', '#e60000', '#008f36', '#5c5c8a', '#e60000', '#008f36', '#063383', '#e60000' ],
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
