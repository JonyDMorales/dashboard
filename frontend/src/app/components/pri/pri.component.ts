import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { ConsultaEventosService } from '../../services/consulta.eventos.service';
import { ConsultaTierraService } from '../../services/consulta.tierra.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-pri',
    templateUrl: './pri.component.html'
})
export class PriComponent implements OnInit {

    busqueda:string = 'PRI';
    candidato:string = '';
    circunscripcion:any = ''; 

    eventosGastoCategoria:Array<any> = [];
    loadingEventosGastoCategoria:boolean = true;
    eventosGastoEstado:Array<any> = [];
    loadingEventosGastoEstado:boolean = true;
    eventosEstado:Array<any> = [];
    loadingEventosEstado:boolean = true;
    eventosGastoSubcategoriaEstructura:Array<any> = [];
    loadingEventosGastoSubcategoriaEstructura:boolean = true;
    eventosGastoSubcategoriaAnimacion:Array<any> = [];
    loadingEventosGastoSubcategoriaAnimacion:boolean = true;
    eventosGastoSubcategoriaTransporte:Array<any> = [];
    loadingevEntosGastoSubcategoriaTransporte:boolean = true;
    eventosGastoSubcategoriaProduccion:Array<any> = [];
    loadingEveventosGastoSubcategoriaProduccion:boolean = true;
    eventosGastoSubcategoriaEspectacular:Array<any> = [];
    loadingEventosGastoSubcategoriaEspectacular:boolean = true;
    eventosGastoSubcategoriaUtilitario:Array<any> = [];
    loadingEventosGastoSubcategoriaUtilitario:boolean = true;
    
    tierraGastoCategoria:Array<any> = [];
    loadingTierraGastoCategoria:boolean = true;
    tierraGastoEstado:Array<any> = [];
    loadingTierraGastoEstado:boolean = true;
    tierraConteoEstado:Array<any> = [];
    loadingTierraConteoEstado:boolean = true;
    tierraGastoSubcategoriaFija:Array<any> = [];
    loadingTierraGastoSubcategoriaFija:boolean = true;
    tierraGastoSubcategoriaMovil:Array<any> = [];
    loadingTierraGastoSubcategoriaMovil:boolean = true;

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
                public _consultaTierraService: ConsultaTierraService,
                public _authService: AuthService) {
        localStorage.setItem('partido', 'PRI');
        this._authService.handleAuthentication();
        this.candidato = localStorage.getItem('candidato');
        if(this.candidato == 'todos' ){
            this.candidato = '';
        }
        this.circunscripcion = localStorage.getItem('circunscripcion');
    }

    ngOnInit() {
        this.getEventosGastoCategoria();
        this.getEventosEstadosGasto();
        this.getEventosEstados();
        this.getEventosGastoSubcategoriaEstructura();
        this.getEventosGastoSubcategoriaAnimacion();
        this.getEventosGastoSubcategoriaTransporte();
        this.getEventosGastoSubcategoriaProduccion();
        this.getEventosGastoSubcategoriaEspectacular();
        this.getEventosGastoSubcategoriaUtilitario();
    
        this.getTierraGastoCategoria();
        this.getTierraGastoEstado();
        this.getTierraEstados();
        this.getTierraGastoSubcategoriaFija();
        this.getTierraGastoSubcategoriaMovil();
    }
    
    public getEventosGastoCategoria(){
        let gastoEstructura:number = 0;
        let gastoAnimacion:number = 0;
        let gastoTransporte:number = 0;
        let gastoProduccion:number = 0;
        let gastoEspectacular:number = 0;
        let gastoUtilitario:number = 0;
        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, 'estructura', '', this.circunscripcion, '', '', '').subscribe(estructura => {
            this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, 'animacion', '', this.circunscripcion, '', '', '').subscribe(animacion => {
                this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, 'transporte', '', this.circunscripcion, '', '', '').subscribe(transporte => {
                    this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, 'produccion', '', this.circunscripcion, '', '', '').subscribe(produccion => {
                        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, 'espectacular', '', this.circunscripcion, '', '', '').subscribe(espectacular => {
                            this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, 'utilitario', '', this.circunscripcion, '', '', '').subscribe(utilitario => {
                                for(let key in estructura['gasto']){
                                    gastoEstructura += estructura['gasto'][key];
                                }
                                for(let key in animacion['gasto']){
                                    gastoAnimacion += animacion['gasto'][key];
                                }
                                for(let key in transporte['gasto']){
                                    gastoTransporte += transporte['gasto'][key];
                                }
                                for(let key in produccion['gasto']){
                                    gastoProduccion += produccion['gasto'][key];
                                }
                                for(let key in espectacular['gasto']){
                                    gastoEspectacular += espectacular['gasto'][key];
                                }
                                for(let key in utilitario['gasto']){
                                    gastoUtilitario += utilitario['gasto'][key];
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
                                this.loadingEventosGastoCategoria = false;
                            });
                        });
                    });
                });
            });
        });
    }

    public getEventosEstadosGasto(){
        this._consultaEventosService.getEstadosEventos('', this.busqueda, this.candidato, '', '', this.circunscripcion, '', '', '').subscribe(res => {
            console.log(this.busqueda);
            console.log(this.candidato);
            console.log(this.circunscripcion);
            if(res){
                let sort = [[],[]];
                switch(this.circunscripcion){
                    case "1":
                        sort[0].push('Baja California');
                        sort[1].push(res['BAJA CALIFORNIA'].gasto);
                        sort[0].push('Baja California Sur');
                        sort[1].push(res['BAJA CALIFORNIA SUR'].gasto);
                        sort[0].push('Chihuahua');
                        sort[1].push(res['CHIHUAHUA'].gasto);
                        sort[0].push('Durango');
                        sort[1].push(res['DURANGO'].gasto);
                        sort[0].push('Jalisco');
                        sort[1].push(res['JALISCO'].gasto);
                        sort[0].push('Nayarit');
                        sort[1].push(res['NAYARIT'].gasto);
                        sort[0].push('Sinaloa');
                        sort[1].push(res['SINALOA'].gasto);
                        sort[0].push('Sonora');
                        sort[1].push(res['SONORA'].gasto);
                    break;
                    case "2":
                        sort[0].push('Aguascalientes');
                        sort[1].push(res['AGUASCALIENTES'].gasto);
                        sort[0].push('Coahuila');
                        sort[1].push(res['COAHUILA'].gasto);
                        sort[0].push('Guanajuato');
                        sort[1].push(res['GUANAJUATO'].gasto);
                        sort[0].push('Nuevo León');
                        sort[1].push(res['NUEVO LEON'].gasto);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERÉTARO'].gasto);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSI'].gasto);
                        sort[0].push('Tamaulipas');
                        sort[1].push(res['TAMAULIPAS'].gasto);
                        sort[0].push('Zacatecas');
                        sort[1].push(res['ZACATECAS'].gasto);
                    break;
                    case "3":
                        sort[0].push('Campeche');
                        sort[1].push(res['CAMPECHE'].gasto);
                        sort[0].push('Chiapas');
                        sort[1].push(res['CHIAPAS'].gasto);
                        sort[0].push('Oaxaca');
                        sort[1].push(res['OAXACA'].gasto);
                        sort[0].push('Quintana Roo');
                        sort[1].push(res['QUINTANA ROO'].gasto);
                        sort[0].push('Tabasco');
                        sort[1].push(res['TABASCO'].gasto);
                        sort[0].push('Veracruz');
                        sort[1].push(res['VERACRUZ'].gasto);
                        sort[0].push('Yucatán');
                        sort[1].push(res['YUCATAN'].gasto);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MEXICO'].gasto);
                        sort[0].push('Guerrero');
                        sort[1].push(res['GUERRERO'].gasto);
                        sort[0].push('Morelos');
                        sort[1].push(res['MORELOS'].gasto);
                        sort[0].push('Puebla');
                        sort[1].push(res['PUEBLA'].gasto);
                        sort[0].push('Tlaxcala');
                        sort[1].push(res['TLAXCALA'].gasto);
                    break;
                    case "5":
                        sort[0].push('Colima');
                        sort[1].push(res['COLIMA'].gasto);
                        sort[0].push('Hidalgo');
                        sort[1].push(res['HIDALGO'].gasto);
                        sort[0].push('México');
                        sort[1].push(res['MEXICO'].gasto);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACAN'].gasto);
                    break;
                }
                
                let estructura = {
                    datasets: [{
                        data: sort[1],
                        backgroundColor: [ this.color10 +' , 0.60)', this.color12 + ', 0.60)',  this.color14 + ', 0.60)', this.color16 + ', 0.60)', this.color18 + ', 0.60)', this.color20 +' , 0.60)', this.color22 +' , 0.60)', this.color24 +' , 0.60)' ],
                        label: ''
                    }],
                    labels: sort[0]
                };
                this.eventosGastoEstado = this._graphicsService.graphicPie('eventosGastoEstado', estructura, 'Gasto de eventos por estado');
                this.loadingEventosGastoEstado = false;
            }
            
        });
    }
    
    public getEventosEstados(){
        this._consultaEventosService.getEstadosEventos('', this.busqueda, this.candidato, '', '', this.circunscripcion, '', '', '').subscribe(res => {
            if(res){
                let sort = [[],[]];
                switch(this.circunscripcion){
                    case "1":
                        sort[0].push('Baja California');
                        sort[1].push(res['BAJA CALIFORNIA'].conteo);
                        sort[0].push('Baja California Sur');
                        sort[1].push(res['BAJA CALIFORNIA SUR'].conteo);
                        sort[0].push('Chihuahua');
                        sort[1].push(res['CHIHUAHUA'].conteo);
                        sort[0].push('Durango');
                        sort[1].push(res['DURANGO'].conteo);
                        sort[0].push('Jalisco');
                        sort[1].push(res['JALISCO'].conteo);
                        sort[0].push('Nayarit');
                        sort[1].push(res['NAYARIT'].conteo);
                        sort[0].push('Sinaloa');
                        sort[1].push(res['SINALOA'].conteo);
                        sort[0].push('Sonora');
                        sort[1].push(res['SONORA'].conteo);
                    break;
                    case "2":
                        sort[0].push('Aguascalientes');
                        sort[1].push(res['AGUASCALIENTES'].conteo);
                        sort[0].push('Coahuila');
                        sort[1].push(res['COAHUILA'].conteo);
                        sort[0].push('Guanajuato');
                        sort[1].push(res['GUANAJUATO'].conteo);
                        sort[0].push('Nuevo León');
                        sort[1].push(res['NUEVO LEON'].conteo);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERÉTARO'].conteo);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSI'].conteo);
                        sort[0].push('Tamaulipas');
                        sort[1].push(res['TAMAULIPAS'].conteo);
                        sort[0].push('Zacatecas');
                        sort[1].push(res['ZACATECAS'].conteo);
                    break;
                    case "3":
                        sort[0].push('Campeche');
                        sort[1].push(res['CAMPECHE'].conteo);
                        sort[0].push('Chiapas');
                        sort[1].push(res['CHIAPAS'].conteo);
                        sort[0].push('Oaxaca');
                        sort[1].push(res['OAXACA'].conteo);
                        sort[0].push('Quintana Roo');
                        sort[1].push(res['QUINTANA ROO'].conteo);
                        sort[0].push('Tabasco');
                        sort[1].push(res['TABASCO'].conteo);
                        sort[0].push('Veracruz');
                        sort[1].push(res['VERACRUZ'].conteo);
                        sort[0].push('Yucatán');
                        sort[1].push(res['YUCATAN'].conteo);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MEXICO'].conteo);
                        sort[0].push('Guerrero');
                        sort[1].push(res['GUERRERO'].conteo);
                        sort[0].push('Morelos');
                        sort[1].push(res['MORELOS'].conteo);
                        sort[0].push('Puebla');
                        sort[1].push(res['PUEBLA'].conteo);
                        sort[0].push('Tlaxcala');
                        sort[1].push(res['TLAXCALA'].conteo);
                    break;
                    case "5":
                        sort[0].push('Colima');
                        sort[1].push(res['COLIMA'].conteo);
                        sort[0].push('Hidalgo');
                        sort[1].push(res['HIDALGO'].conteo);
                        sort[0].push('México');
                        sort[1].push(res['MEXICO'].conteo);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACAN'].conteo);
                    break;
                }
                let estructura = {
                    datasets: [{
                        data: sort[1],
                        backgroundColor: [ this.color1 +' , 0.60)', this.color3 + ', 0.60)',  this.color5 + ', 0.60)', this.color7 + ', 0.60)', this.color9 + ', 0.60)', this.color11 +' , 0.60)', this.color13 +' , 0.60)', this.color15 +' , 0.60)' ],
                        label: ''
                    }],
                    labels: sort[0]
                };
                this.eventosEstado = this._graphicsService.graphicPie('eventosEstado', estructura, 'Estados con mayor cantidad de eventos');
                this.loadingEventosEstado = false;
            }
        });
    }
    
    public getEventosGastoSubcategoriaEstructura(){
        let categoria = 'estructura';
        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(estructura => {
            let estruct = {
                datasets: [{
                    data: Object.values(estructura['gasto']),
                    backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)', this.color5 +' , 0.40)', this.color6 +' , 0.40)', this.color7 +' , 0.40)' ],
                    label: ''
                }],
                labels: Object.keys(estructura['gasto'])
            };
            this.eventosGastoSubcategoriaEstructura = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEstructura', estruct, 'Gasto de estructura');
            this.loadingEventosGastoSubcategoriaEstructura = false;   
        });
        
    }
    
    public getEventosGastoSubcategoriaAnimacion(){
        let categoria = 'animacion';
        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(animacion => {
            let estruct = {
                datasets: [{
                    data: Object.values(animacion['gasto']),
                    backgroundColor: [ this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 + ',0.40)', this.color16 + ',0.40)', this.color17 + ', 0.40)' ],
                    label: ''
                }],
                labels: Object.keys(animacion['gasto'])
            };
            this.eventosGastoSubcategoriaAnimacion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaAnimacion', estruct, 'Gasto de animacion');
            this.loadingEventosGastoSubcategoriaAnimacion = false;
        });
        
    }

    public getEventosGastoSubcategoriaTransporte(){
        let categoria = 'transporte';
        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(transporte => {
            let estruct = {
                datasets: [{
                    data: Object.values(transporte['gasto']),
                    backgroundColor: [ this.color18 +' , 0.40)', this.color19 + ', 0.40)',  this.color20 + ', 0.40)', this.color21 + ',0.40)', this.color22 + ',0.40)', this.color23 + ', 0.40)' ],
                    label: ''
                }],
                labels: Object.keys(transporte['gasto'])
            };
            this.eventosGastoSubcategoriaTransporte = this._graphicsService.graphicRadar('eventosGastoSubcategoriaTransporte', estruct, 'Gasto de transporte');
            this.loadingevEntosGastoSubcategoriaTransporte = false;
        });
    }
    
    public getEventosGastoSubcategoriaProduccion(){ 
        let categoria = 'produccion';
        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(produccion => {
            let estruct = {
                datasets: [{
                data: Object.values(produccion['gasto']),
                backgroundColor: [ this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)', this.color5 +' , 0.40)', this.color6 +' , 0.40)', this.color7 +' , 0.40)' ],
                label: ''
                }],
                labels: Object.keys(produccion['gasto'])
            };
            this.eventosGastoSubcategoriaProduccion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaProduccion', estruct, 'Gasto de produccion');
            this.loadingEveventosGastoSubcategoriaProduccion = false;
        });
        
    }
    
    public getEventosGastoSubcategoriaEspectacular(){
        let categoria = 'espectacular';
        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(espectacular => {
            let estruct = {
                datasets: [{
                data: Object.values(espectacular['gasto']),
                backgroundColor: [ this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)' ],
                label: ''
                }],
                labels: Object.keys(espectacular['gasto'])
            };
            this.eventosGastoSubcategoriaEspectacular = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEspectacular', estruct, 'Gasto de espectaculares');
            this.loadingEventosGastoSubcategoriaEspectacular = false;
        });
    }
    
    public getEventosGastoSubcategoriaUtilitario(){
        let categoria = 'utilitario';
        this._consultaEventosService.getGastoSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(utilitario => {
            let estruct = {
                datasets: [{
                data: Object.values(utilitario['gasto']),
                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)', this.color5 +' , 0.40)', this.color6 +' , 0.40)', this.color7 +' , 0.40)' ],
                label: ''
                }],
                labels: Object.keys(utilitario['gasto'])
            };
            this.eventosGastoSubcategoriaUtilitario = this._graphicsService.graphicRadar('eventosGastoSubcategoriaUtilitario', estruct, 'Gasto de utilitario');
            this.loadingEventosGastoSubcategoriaUtilitario = false;
        });
    }

    /*************** Aqui empieza Tierra, Eventos no pasar ***************/
    
    public getTierraGastoCategoria() {
        this._consultaTierraService.getGastoTotalTierra('', this.busqueda, this.candidato, 'movil', '', this.circunscripcion, '', '', '').subscribe(movilPRI => {
            this._consultaTierraService.getGastoTotalTierra('', this.busqueda, this.candidato, 'fija', '', this.circunscripcion, '', '', '').subscribe(fijaPRI => {
                const estructura = {
                    labels: ['Móvil', 'Fija'],
                    datasets: [{
                        backgroundColor: [ this.color11 +' , 0.60)', this.color13 + ', 0.60)' ],
                        data: [movilPRI['total'], fijaPRI['total'], 0]
                    }]
                };
                this.tierraGastoCategoria = this._graphicsService.graphicBar('tierraGastoCategoria', estructura, 'Gasto de tierra por categoria');
                this.loadingTierraGastoCategoria = false;
            });
        });
    }
    
    public getTierraGastoEstado() {
        this._consultaTierraService.getEstadosTierra('', this.busqueda, this.candidato, '', '', this.circunscripcion, '', '', '').subscribe(res => {
            if(res){
                let sort = [[],[]];
                switch(this.circunscripcion){
                    case "1":
                        sort[0].push('Baja California');
                        sort[1].push(res['BAJA CALIFORNIA'].gasto);
                        sort[0].push('Baja California Sur');
                        sort[1].push(res['BAJA CALIFORNIA SUR'].gasto);
                        sort[0].push('Chihuahua');
                        sort[1].push(res['CHIHUAHUA'].gasto);
                        sort[0].push('Durango');
                        sort[1].push(res['DURANGO'].gasto);
                        sort[0].push('Jalisco');
                        sort[1].push(res['JALISCO'].gasto);
                        sort[0].push('Nayarit');
                        sort[1].push(res['NAYARIT'].gasto);
                        sort[0].push('Sinaloa');
                        sort[1].push(res['SINALOA'].gasto);
                        sort[0].push('Sonora');
                        sort[1].push(res['SONORA'].gasto);
                    break;
                    case "2":
                        sort[0].push('Aguascalientes');
                        sort[1].push(res['AGUASCALIENTES'].gasto);
                        sort[0].push('Coahuila');
                        sort[1].push(res['COAHUILA'].gasto);
                        sort[0].push('Guanajuato');
                        sort[1].push(res['GUANAJUATO'].gasto);
                        sort[0].push('Nuevo León');
                        sort[1].push(res['NUEVO LEON'].gasto);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERÉTARO'].gasto);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSI'].gasto);
                        sort[0].push('Tamaulipas');
                        sort[1].push(res['TAMAULIPAS'].gasto);
                        sort[0].push('Zacatecas');
                        sort[1].push(res['ZACATECAS'].gasto);
                    break;
                    case "3":
                        sort[0].push('Campeche');
                        sort[1].push(res['CAMPECHE'].gasto);
                        sort[0].push('Chiapas');
                        sort[1].push(res['CHIAPAS'].gasto);
                        sort[0].push('Oaxaca');
                        sort[1].push(res['OAXACA'].gasto);
                        sort[0].push('Quintana Roo');
                        sort[1].push(res['QUINTANA ROO'].gasto);
                        sort[0].push('Tabasco');
                        sort[1].push(res['TABASCO'].gasto);
                        sort[0].push('Veracruz');
                        sort[1].push(res['VERACRUZ'].gasto);
                        sort[0].push('Yucatán');
                        sort[1].push(res['YUCATAN'].gasto);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MEXICO'].gasto);
                        sort[0].push('Guerrero');
                        sort[1].push(res['GUERRERO'].gasto);
                        sort[0].push('Morelos');
                        sort[1].push(res['MORELOS'].gasto);
                        sort[0].push('Puebla');
                        sort[1].push(res['PUEBLA'].gasto);
                        sort[0].push('Tlaxcala');
                        sort[1].push(res['TLAXCALA'].gasto);
                    break;
                    case "5":
                        sort[0].push('Colima');
                        sort[1].push(res['COLIMA'].gasto);
                        sort[0].push('Hidalgo');
                        sort[1].push(res['HIDALGO'].gasto);
                        sort[0].push('México');
                        sort[1].push(res['MEXICO'].gasto);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACAN'].gasto);
                    break;
                }
                const estructura = {
                    datasets: [{
                        data: sort[1],
                        backgroundColor: [ this.color10 +' , 0.6)', this.color12 + ', 0.6)',  this.color14 + ', 0.6)', this.color16 + ', 0.6)', this.color18 + ', 0.6)', this.color20 +' , 0.60)', this.color22 +' , 0.60)', this.color24 +' , 0.60)' ],
                        label: ''
                    }],
                    labels: sort[0]
                };
                this.tierraGastoEstado = this._graphicsService.graphicPie('tierraGastoEstado', estructura, 'Gasto de tierra por estado');
                this.loadingTierraGastoEstado = false;
            }
        });
    }
    
    public getTierraEstados(){
        this._consultaTierraService.getEstadosTierra('', this.busqueda, this.candidato, '', '', this.circunscripcion, '', '', '').subscribe(res =>{
            if(res){
                let sort = [[],[]];
                switch(this.circunscripcion){
                    case "1":
                        sort[0].push('Baja California');
                        sort[1].push(res['BAJA CALIFORNIA'].gasto);
                        sort[0].push('Baja California Sur');
                        sort[1].push(res['BAJA CALIFORNIA SUR'].gasto);
                        sort[0].push('Chihuahua');
                        sort[1].push(res['CHIHUAHUA'].gasto);
                        sort[0].push('Durango');
                        sort[1].push(res['DURANGO'].gasto);
                        sort[0].push('Jalisco');
                        sort[1].push(res['JALISCO'].gasto);
                        sort[0].push('Nayarit');
                        sort[1].push(res['NAYARIT'].gasto);
                        sort[0].push('Sinaloa');
                        sort[1].push(res['SINALOA'].gasto);
                        sort[0].push('Sonora');
                        sort[1].push(res['SONORA'].gasto);
                    break;
                    case "2":
                        sort[0].push('Aguascalientes');
                        sort[1].push(res['AGUASCALIENTES'].gasto);
                        sort[0].push('Coahuila');
                        sort[1].push(res['COAHUILA'].gasto);
                        sort[0].push('Guanajuato');
                        sort[1].push(res['GUANAJUATO'].gasto);
                        sort[0].push('Nuevo León');
                        sort[1].push(res['NUEVO LEON'].gasto);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERETARO'].gasto);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSI'].gasto);
                        sort[0].push('Tamaulipas');
                        sort[1].push(res['TAMAULIPAS'].gasto);
                        sort[0].push('Zacatecas');
                        sort[1].push(res['ZACATECAS'].gasto);
                    break;
                    case "3":
                        sort[0].push('Campeche');
                        sort[1].push(res['CAMPECHE'].gasto);
                        sort[0].push('Chiapas');
                        sort[1].push(res['CHIAPAS'].gasto);
                        sort[0].push('Oaxaca');
                        sort[1].push(res['OAXACA'].gasto);
                        sort[0].push('Quintana Roo');
                        sort[1].push(res['QUINTANA ROO'].gasto);
                        sort[0].push('Tabasco');
                        sort[1].push(res['TABASCO'].gasto);
                        sort[0].push('Veracruz');
                        sort[1].push(res['VERACRUZ'].gasto);
                        sort[0].push('Yucatán');
                        sort[1].push(res['YUCATAN'].gasto);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MEXICO'].gasto);
                        sort[0].push('Guerrero');
                        sort[1].push(res['GUERRERO'].gasto);
                        sort[0].push('Morelos');
                        sort[1].push(res['MORELOS'].gasto);
                        sort[0].push('Puebla');
                        sort[1].push(res['PUEBLA'].gasto);
                        sort[0].push('Tlaxcala');
                        sort[1].push(res['TLAXCALA'].gasto);
                    break;
                    case "5":
                        sort[0].push('Colima');
                        sort[1].push(res['COLIMA'].gasto);
                        sort[0].push('Hidalgo');
                        sort[1].push(res['HIDALGO'].gasto);
                        sort[0].push('México');
                        sort[1].push(res['MEXICO'].gasto);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACAN'].gasto);
                    break;
                }
                let estructura = {
                    datasets: [{
                        data: sort[1],
                        backgroundColor: [ this.color1 +' , 0.6)', this.color3 + ', 0.6)',  this.color5 + ', 0.6)', this.color7 + ', 0.6)', this.color9 + ', 0.6)', this.color11 +' , 0.60)', this.color13 +' , 0.60)', this.color15 +' , 0.60)' ],
                        label: ''
                    }],
                    labels: sort[0]
                };
                this.tierraConteoEstado = this._graphicsService.graphicPie('tierraConteoEstado', estructura, 'Estados con mayor cantidad de tierra');
                this.loadingTierraConteoEstado = false;
            }
        });
    }
    
    public getTierraGastoSubcategoriaFija(){
        const categoria = 'fija';
        this._consultaTierraService.getSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(res =>{
            const estructura = {
                labels: Object.keys(res['gasto']),
                datasets: [{
                    label: 'PRI',
                    backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)' ],
                    data: Object.values(res['gasto'])
                }]
            };
            this.tierraGastoSubcategoriaFija = this._graphicsService.graphicPie('tierraGastoSubcategoriaFija', estructura, 'Gasto de fija por subcategoria');
            this.loadingTierraGastoSubcategoriaFija = false;
        });
    }
    
    public getTierraGastoSubcategoriaMovil(){
        let categoria = 'movil';
        this._consultaTierraService.getSubcategoria('', this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', '', '').subscribe(res =>{
            const estructura = {
                labels: Object.keys(res['gasto']),
                datasets: [{
                    label: 'PRI',
                    backgroundColor: [ this.color21 +' , 0.40)', this.color22 + ', 0.40)',  this.color23 + ', 0.40)', this.color24 + ',0.40)', this.color25 + ',0.40)', this.color0 + ', 0.40)', this.color1 + ', 0.40)', this.color2 + ', 0.40)', this.color3 + ', 0.40)' ],
                    data: Object.values(res['gasto'])
                }]
            };
            this.tierraGastoSubcategoriaMovil = this._graphicsService.graphicPie('tierraGastoSubcategoriaMovil', estructura, 'Gasto de fija por subcategoria');
            this.loadingTierraGastoSubcategoriaMovil = false;
        });
    }
}
