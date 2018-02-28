import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultaTierraService {

    public url = 'http://dashboardfinal.us-east-1.elasticbeanstalk.com';
    //public url = 'http://localhost:9000';

    constructor( private _http: HttpClient) { }

    public getGastoTotalTierra(alianza, persona, categoria, subcategoria) {
        const uri = this.url + '/tierra/gastototal';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria, 'subcategoria': subcategoria } ).map( res => {
            return res['total']; });
    }

    public getEstadosTierra(alianza, persona, categoria, subcategoria) {
        const uri = this.url + '/tierra/estadostierra';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria, 'subcategoria': subcategoria } ).map((res) => {
            return res['estados'];
        });
    }

    public getConsultaTierra(alianza, persona, categoria, subcategoria){
        const uri = this.url + '/tierra/consulta';
        return this._http.post(uri, { 'alianza': alianza, 'persona': persona, 'categoria': categoria, 'subcategoria': subcategoria } ).map((res) => {
            return res['tierra'];
        });
    }
}
