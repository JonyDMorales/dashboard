import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultaEventosService {

    public url = 'http://dashboardfinal.us-east-1.elasticbeanstalk.com';
    //public url = 'http://localhost:9000';

    constructor(private _http: HttpClient) { }

    public getGastoTotalEventos(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2) {
        let uri = this.url + '/eventos/gastototal';
        return this._http.post(uri, { 'alianza': alianza, 
                                      'persona': persona, 
                                      'categoria': categoria, 
                                      'subcategoria': subcategoria,
                                      'circunscripcion': circunscripcion,
                                      'estado': estado,
                                      'created_at1': created_at1,
                                      'created_at2': created_at2 } ).map( res => {
            return res['total']; });
    }

    public getGastoSubcategoria(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2) {
        let uri = this.url + '/eventos/gastosubcategoria';
        return this._http.post(uri, { 'alianza': alianza, 
                                      'persona': persona, 
                                      'categoria': categoria, 
                                      'subcategoria': subcategoria,
                                      'circunscripcion': circunscripcion,
                                      'estado': estado,
                                      'created_at1': created_at1,
                                      'created_at2': created_at2 } ).map( res => {
            return res['subcategorias']; });
    }

    public getEstadosEventos(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2) {
        let uri = this.url + '/eventos/estadoseventos';
        return this._http.post(uri, { 'alianza': alianza, 
                                      'persona': persona, 
                                      'categoria': categoria, 
                                      'subcategoria': subcategoria,
                                      'circunscripcion': circunscripcion,
                                      'estado': estado,
                                      'created_at1': created_at1,
                                      'created_at2': created_at2 } ).map((res) => {
            return res['estados'];
        });
    }

    public getConsultaEventos(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2) {
        let uri = this.url + '/eventos/consulta';
        return this._http.post(uri, { 'alianza': alianza, 
                                      'persona': persona, 
                                      'categoria': categoria, 
                                      'subcategoria': subcategoria,
                                      'circunscripcion': circunscripcion,
                                      'estado': estado,
                                      'created_at1': created_at1,
                                      'created_at2': created_at2  } ).map((res) => {
            return res;
        });
    }

}
