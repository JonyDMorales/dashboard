import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConsultaService {

    public url = 'http://dashboard-integra.us-east-1.elasticbeanstalk.com';

    constructor(private _http: Http) { }

    public getEventPRI() {
        const uri = this.url + '/eventoPRI-PVEM-PANAL';
        return this._http.get(uri);
    }

    public getTierraPRI() {
        const uri = this.url + '/tierraPRI-PVEM-PANAL';
        return this._http.get(uri);
    }

    public getEventPAN() {
        const uri = this.url + '/eventoPAN-PRD-MC';
        return this._http.get(uri);
    }

    public getTierraPAN() {
        const uri = this.url + '/tierraPAN-PRD-MC';
        return this._http.get(uri);
    }

    public getEventMORENA() {
        const uri = this.url + '/eventoMORENA-PT-PES';
        return this._http.get(uri);
    }

    public getTierraMORENA() {
        const uri = this.url + '/eventoMORENA-PT-PES';
        return this._http.get(uri);
    }

}
