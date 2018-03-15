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

    busqueda:string = 'PRI-PVEM-PANAL';
    candidato:string = '';
    circunscripcion:any = '';
    fecha_inicio:Date;
    fecha_termino:Date;
    

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
        
        this._authService.handleAuthentication();
        this.candidato = localStorage.getItem('candidato');
        this.circunscripcion = localStorage.getItem('circunscripcion');
        if(localStorage.getItem('fecha_inicio')){
            this.fecha_inicio = new Date(localStorage.getItem('fecha_inicio'));
        }else{
            this.fecha_inicio = new Date('2018-03-01');
        }
        if(localStorage.getItem('fecha_termino')){
            this.fecha_termino = new Date(localStorage.getItem('fecha_termino'));
        }else{
            this.fecha_termino = new Date('2018-08-01');
        }
        console.log('candidato: ' + this.candidato);
        console.log('circunscripcion: ' + this.circunscripcion);
        console.log('fecha_inicio: ' + this.fecha_inicio);
        console.log('fecha_termino: ' + this.fecha_termino);
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
        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, 'estructura', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(estructura => {
            this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, 'animacion', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(animacion => {
                this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, 'transporte', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(transporte => {
                    this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, 'produccion', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(produccion => {
                        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, 'espectacular', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(espectacular => {
                            this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, 'utilitario', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(utilitario => {
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
                                this.loadingEventosGastoCategoria = false;
                            });
                        });
                    });
                });
            });
        });
    }

    public getEventosEstadosGasto(){
        this._consultaEventosService.getEstadosEventos(this.busqueda, this.candidato, '', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(res => {
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
                        sort[1].push(res['NUEVO LEÓN'].gasto);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERÉTARO'].gasto);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSÍ'].gasto);
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
                        sort[1].push(res['YUCATÁN'].gasto);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MÉXICO'].gasto);
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
                        sort[1].push(res['MÉXICO'].gasto);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACÁN'].gasto);
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
        this._consultaEventosService.getEstadosEventos(this.busqueda, this.candidato, '', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(res => {
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
                        sort[1].push(res['NUEVO LEÓN'].conteo);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERÉTARO'].conteo);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSÍ'].conteo);
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
                        sort[1].push(res['YUCATÁN'].conteo);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MÉXICO'].conteo);
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
                        sort[1].push(res['MÉXICO'].conteo);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACÁN'].conteo);
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
        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(estructura => {
            let estruct = {
                datasets: [{
                    data: Object.values(estructura),
                    backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.5)', this.color6+' , 0.5)', this.color7 + ', 0.5)',  this.color8 + ', 0.5)', this.color9 + ', 0.5)', this.color10 + ', 0.5)', this.color11 + ', 0.5)' ],
                    label: ''
                }],
                labels: Object.keys(estructura)
            };
            this.eventosGastoSubcategoriaEstructura = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEstructura', estruct, 'Gasto de estructura');
            this.loadingEventosGastoSubcategoriaEstructura = false;   
        });
        
    }
    
    public getEventosGastoSubcategoriaAnimacion(){
        let categoria = 'animacion';
        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(animacion => {
            let estruct = {
                datasets: [{
                    data: Object.values(animacion),
                    backgroundColor: [ this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 + ',0.40)', this.color16 + ',0.40)', this.color17 + ', 0.40)' ],
                    label: ''
                }],
                labels: Object.keys(animacion)
            };
            this.eventosGastoSubcategoriaAnimacion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaAnimacion', estruct, 'Gasto de animacion');
            this.loadingEventosGastoSubcategoriaAnimacion = false;
        });
        
    }

    
    public getEventosGastoSubcategoriaTransporte(){
        let categoria = 'transporte';
        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(transporte => {
            let estruct = {
                datasets: [{
                    data: Object.values(transporte),
                    backgroundColor: [ this.color18 +' , 0.40)', this.color19 + ', 0.40)',  this.color20 + ', 0.40)', this.color21 + ',0.40)', this.color22 + ',0.40)', this.color23 + ', 0.40)' ],
                    label: ''
                }],
                labels: Object.keys(transporte)
            };
            this.eventosGastoSubcategoriaTransporte = this._graphicsService.graphicRadar('eventosGastoSubcategoriaTransporte', estruct, 'Gasto de transporte');
            this.loadingevEntosGastoSubcategoriaTransporte = false;
        });
    }
    
    public getEventosGastoSubcategoriaProduccion(){ 
        let categoria = 'produccion';
        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(produccion => {
            let estruct = {
                datasets: [{
                data: Object.values(produccion),
                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 + ',0.40)' ],
                label: ''
                }],
                labels: Object.keys(produccion)
            };
            this.eventosGastoSubcategoriaProduccion = this._graphicsService.graphicRadar('eventosGastoSubcategoriaProduccion', estruct, 'Gasto de produccion');
            this.loadingEveventosGastoSubcategoriaProduccion = false;
        });
        
    }
    
    public getEventosGastoSubcategoriaEspectacular(){
        let categoria = 'espectacular';
        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(espectacular => {
            let estruct = {
                datasets: [{
                data: Object.values(espectacular),
                backgroundColor: [ this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)' ],
                label: ''
                }],
                labels: Object.keys(espectacular)
            };
            this.eventosGastoSubcategoriaEspectacular = this._graphicsService.graphicRadar('eventosGastoSubcategoriaEspectacular', estruct, 'Gasto de espectaculares');
            this.loadingEventosGastoSubcategoriaEspectacular = false;
        });
    }
    
    public getEventosGastoSubcategoriaUtilitario(){
        let categoria = 'utilitario';
        this._consultaEventosService.getGastoSubcategoria(this.busqueda, this.candidato, categoria, '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(utilitario => {
            let estruct = {
                datasets: [{
                data: Object.values(utilitario),
                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)', this.color21 + ', 0.40)',this.color22 +' , 0.40)', this.color23 + ', 0.40)',  this.color24 + ', 0.40)', this.color25 + ',0.40)', this.color0 + ',0.40)', this.color1 + ', 0.40)', this.color2 +' , 0.40)', this.color3 + ', 0.40)',  this.color4 + ', 0.40)', this.color5 +' , 0.40)', this.color6 +' , 0.40)', this.color7 +' , 0.40)' ],
                label: ''
                }],
                labels: Object.keys(utilitario)
            };
            this.eventosGastoSubcategoriaUtilitario = this._graphicsService.graphicRadar('eventosGastoSubcategoriaUtilitario', estruct, 'Gasto de utilitario');
            this.loadingEventosGastoSubcategoriaUtilitario = false;
        });
    }

    /*************** Aqui empieza Tierra, Eventos no pasar ***************/
    
    public getTierraGastoCategoria() {
        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, 'Movil', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(movilPRI => {
            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, 'Fija', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(fijaPRI => {
                const estructura = {
                    labels: ['Móvil', 'Fija'],
                    datasets: [{
                        label: 'PRI',
                        backgroundColor: [ this.color11 +' , 0.60)', this.color13 + ', 0.60)' ],
                        data: [movilPRI, fijaPRI]
                    }]
                };
                this.tierraGastoCategoria = this._graphicsService.graphicBar('tierraGastoCategoria', estructura, 'Gasto de tierra por categoria');
                this.loadingTierraGastoCategoria = false;
            });
        });
    }
    
    public getTierraGastoEstado() {
        this._consultaTierraService.getEstadosTierra(this.busqueda, this.candidato, '', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(res => {
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
                        sort[1].push(res['NUEVO LEÓN'].gasto);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERÉTARO'].gasto);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSÍ'].gasto);
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
                        sort[1].push(res['YUCATÁN'].gasto);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MÉXICO'].gasto);
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
                        sort[1].push(res['MÉXICO'].gasto);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACÁN'].gasto);
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
        this._consultaTierraService.getEstadosTierra(this.busqueda, this.candidato, '', '', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(res =>{
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
                        sort[1].push(res['NUEVO LEÓN'].gasto);
                        sort[0].push('Querétaro');
                        sort[1].push(res['QUERÉTARO'].gasto);
                        sort[0].push('San Luis Potosí');
                        sort[1].push(res['SAN LUIS POTOSÍ'].gasto);
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
                        sort[1].push(res['YUCATÁN'].gasto);
                    break;
                    case "4":
                        sort[0].push('Ciudad de México');
                        sort[1].push(res['CIUDAD DE MÉXICO'].gasto);
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
                        sort[1].push(res['MÉXICO'].gasto);
                        sort[0].push('Michoacán');
                        sort[1].push(res['MICHOACÁN'].gasto);
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
        const categoria = 'Fija';
        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Bardas', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Espectaculares => {
            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Buzones', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Bardas => {
                this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Cajas de Luz', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Lonas => {
                    this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Carteles', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Puentes => {
                        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Espectaculares', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Pendones => {
                            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Espectaculares de Pantallas Digitales', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Kioscos => {
                                this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Kioscos', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Carteles => {
                                    this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Lonas', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Parabuses => {
                                        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Mantas (Igual o Mayor a 12 MTS)', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Mobiliario => {
                                            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Mantas (Menores a 12 MTS)', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Volantes => {
                                                this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Marquesinas', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(VallaI => {
                                                    this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Muebles Urbanos', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(VallaD => {
                                                        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Pantallas Fijas', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Pantallas => {
                                                            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Parabuses', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Propaganda => {
                                                                this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Pendones', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Buzones => {
                                                                    this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Propaganda en Columnas', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Cajas => {
                                                                        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Puentes', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Marquesinas => {
                                                                            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Valla Digital', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Muebles => {
                                                                                this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Volantes', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(EspectacularesP => {
                                                                                            const estruct = {
                                                                                                datasets: [{
                                                                                                data: [ Espectaculares, Bardas, Lonas, Puentes, Pendones, Kioscos, Carteles, Parabuses, Mobiliario, Volantes, VallaI, VallaD, Pantallas, Propaganda, Buzones, Cajas, Marquesinas, Muebles, EspectacularesP],
                                                                                                backgroundColor: [ this.color0 +' , 0.40)', this.color1 + ', 0.40)',  this.color2 + ', 0.40)', this.color3 + ',0.40)', this.color4 + ',0.40)', this.color5 + ', 0.40)',this.color6 +' , 0.40)', this.color7 + ', 0.40)',  this.color8 + ', 0.40)', this.color9 + ',0.40)', this.color10 + ',0.40)', this.color11 + ', 0.40)', this.color12 +' , 0.40)', this.color13 + ', 0.40)',  this.color14 + ', 0.40)', this.color15 +' , 0.40)', this.color16 +' , 0.40)', this.color17 + ', 0.40)',  this.color18 + ', 0.40)', this.color19 + ',0.40)', this.color20 + ',0.40)' ],
                                                                                                label: ''
                                                                                                }],
                                                                                                labels: [ 'Bardas', 'Buzones', 'Cajas de Luz', 'Carteles', 'Espectaculares', 'Espectaculares de Pantallas Digitales', 'Kioscos', 'Lonas', 'Mantas (Igual o Mayor a 12 MTS)', 'Mantas (Menores a 12 MTS)', 'Marquesinas', 'Muebles Urbanos', 'Pantallas Fijas', 'Parabuses', 'Pendones', 'Propaganda en Columnas', 'Puentes', 'Valla Digital', 'Volantes' ]
                                                                                            };
                                                                                            this.tierraGastoSubcategoriaFija = this._graphicsService.graphicRadar('tierraGastoSubcategoriaFija', estruct, 'Gasto de fija');
                                                                                            this.loadingTierraGastoSubcategoriaFija = false;
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
        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Bicicletas/Bicitaxis/Mototaxis', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Transporte => {
            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Brigadas', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Vehiculos => {
                this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Metro', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Particulares => {
                    this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Perifoneo', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Taxis => {
                        this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Transporte Publico', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Metro => {
                            this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Vehiculos Particulares', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Brigadas => {
                                this._consultaTierraService.getGastoTotalTierra(this.busqueda, this.candidato, categoria, 'Vehiculos Publicitarios', this.circunscripcion, '', this.fecha_inicio, this.fecha_termino).subscribe(Bicicletas => {
                                    const estruct = {
                                        datasets: [{
                                        data: [ Transporte, Vehiculos, Particulares, Taxis, Metro, Brigadas, Bicicletas ],
                                        backgroundColor: [ this.color21 +' , 0.40)', this.color22 + ', 0.40)',  this.color23 + ', 0.40)', this.color24 + ',0.40)', this.color25 + ',0.40)', this.color0 + ', 0.40)', this.color1 + ', 0.40)', this.color2 + ', 0.40)', this.color3 + ', 0.40)' ],
                                        label: ''
                                        }],
                                        labels: [ 'Bicicletas/Bicitaxis/Mototaxis', 'Brigadas', 'Metro', 'Perifoneo', 'Transporte Publico', 'Vehiculos Particulares', 'Vehiculos Publicitarios' ]
                                    };
                                    this.tierraGastoSubcategoriaMovil = this._graphicsService.graphicRadar('tierraGastoSubcategoriaMovil', estruct, 'Gasto de Movil');
                                    this.loadingTierraGastoSubcategoriaMovil = false;
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}
