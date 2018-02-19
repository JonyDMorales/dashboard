import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultaEventosService {

    //public url = 'http://dashboard-integra.us-east-1.elasticbeanstalk.com';
    public url = 'http://localhost:9000';

    constructor(private _http: HttpClient) { }

    public getGastoTotalEventos(alianza, persona, categoria, subcategoria) {
        let uri = this.url + '/eventos/gastototal';
        let header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria, 'subcategoria': subcategoria } ).map( res => {
            return res['total']; });
    }

    public getGastoSubcategoria(alianza, persona, categoria) {
        let uri = this.url + '/eventos/gastosubcategoria';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map( res => {
            return res['subcategorias']; });
    }

    public getEstadosEventos(alianza, persona, categoria, subcategoria) {
        let uri = this.url + '/eventos/estadoseventos';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria, 'subcategoria': subcategoria } ).map((res) => {
            return res['estados'];
        });
    }

    public getConsultaEventos(alianza, persona, categoria, subcategoria) {
        let uri = this.url + '/eventos/consulta';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria, 'subcategoria': subcategoria } ).map((res) => {
            return res;
        });
    }

}
