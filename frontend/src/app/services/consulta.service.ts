import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ConsultaService {

    public url = 'http://dashboard-integra.us-east-1.elasticbeanstalk.com';

    constructor( private _http: HttpClient) { }

    public getGastoTotalEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/gastototal';
        const header = new HttpHeaders();
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res['total'];
        });
    }

    public getConteoEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/conteoeventos';
        const header = new HttpHeaders();
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }

    public getGastoEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/gastoeventos';
        const header = new HttpHeaders();
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }

    public getConsultaEventos(alianza, persona, categoria) {
        const uri = this.url + '/eventos/consulta';
        const header = new HttpHeaders();
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }

    public getGastoTotalTierra(alianza, persona, categoria) {
        const uri = this.url + '/tierra/gastototal';
        const header = new HttpHeaders();
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }

    public getGastoCategoriaTierra(alianza, persona, categoria) {
        const uri = this.url + '/tierra/gastocategoria';
        const header = new HttpHeaders();
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }

    public getConsultaTierra(alianza, persona, categoria) {
        const uri = this.url + '/tierra/consulta';
        const header = new HttpHeaders();
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }
}
