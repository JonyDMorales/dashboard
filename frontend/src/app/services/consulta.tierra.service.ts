import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultaTierraService {

    public url = 'http://dashboard-integra.us-east-1.elasticbeanstalk.com';

    constructor( private _http: HttpClient) { }

    public getGastoTotalTierra(alianza, persona, categoria,subcategoria) {
        const uri = this.url + '/tierra/gastototal';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria, 'subcategoria': subcategoria } ).map( res => {
            return res['total']; });
    }

    public getGastoCategoriaTierra(alianza, persona, categoria) {
        const uri = this.url + '/tierra/gastocategoria';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res['eventos'];
        });
    }

    public getConsultaTierra(alianza, persona, categoria) {
        const uri = this.url + '/tierra/consulta';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria } ).map((res) => {
            return res;
        });
    }
}
