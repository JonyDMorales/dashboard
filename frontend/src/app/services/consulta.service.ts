import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultaService {

    public url = 'http://dashboard-integra.us-east-1.elasticbeanstalk.com';

    constructor( private _http: HttpClient) { }

    public getEventPRI() {
        const uri = this.url + '/eventos/gastototal';
        const headers = new HttpHeaders({
            'alianza': 'PRI-PVEM-PANAL'
        });
        return this._http.get(uri, { headers }).map((res) => {
            /*if (`${ res }.?_body`) {
                return `${ res }.?_body`;
            }*/
            return res;
        });
    }

    public getTierraPRI() {
        const uri = this.url + '/tierraPRI-PVEM-PANAL';
        return this._http.get(uri).map((res) => {
            if (`${ res }.?_body`) {
                return `${ res }.?_body`;
            }
            return;
         });
    }

    public getEventPAN() {
        const uri = this.url + '/eventoPAN-PRD-MC';
        return this._http.get(uri).map((res) => {
            if (`${ res }.?_body`) {
                return `${ res }.?_body`;
            }
            return;
         });
    }

    public getTierraPAN() {
        const uri = this.url + '/tierraPAN-PRD-MC';
        return this._http.get(uri).map((res) => {
            if (`${ res }.?_body`) {
                return `${ res }.?_body`;
            }
            return;
         });
    }

    public getEventMORENA() {
        const uri = this.url + '/eventoMORENA-PT-PES';
        return this._http.get(uri).map((res) => {
            if (`${ res }.?_body`) {
                return `${ res }.?_body`;
            }
            return;
         });
    }

    public getTierraMORENA() {
        const uri = this.url + '/tierraMORENA-PT-PES';
        return this._http.get(uri).map((res) => {
            if (`${ res }.?_body`) {
                return `${ res }.?_body`;
            }
            return;
         });
    }

}
