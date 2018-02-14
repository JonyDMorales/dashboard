import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultaEventosService {

    public url = 'http://dashboard-integra.us-east-1.elasticbeanstalk.com';

    constructor(private _http: HttpClient) { }

    public getGastoTotalEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/gastototal';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map( res => {
            return res['total']; });
    }

    public getGastoSubcategoria(alianza, persona, categoria, subcategoria) {
        const uri = this.url + '/eventos/gastoSubcategoria';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map( res => {
            return res['total']; });
    }

    public getConteoEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/conteoeventos';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res['eventos'];
        });
    }

    public getGastoEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/gastoeventos';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res['eventos'];
        });
    }

    public getConsultaEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/consulta';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }

}
