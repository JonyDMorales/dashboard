import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConsultaService {

    public url:string = 'http://localhost:9000';
    //public url:string = 'http://dashboard-integra.us-east-1.elasticbeanstalk.com';

    constructor(private _http: Http) { }

    public getEventPRI():any {
        this.url += '/eventoPRI-PVEM-PANAL';
        return this._http.get(this.url);
    }

    public getTierraPRI():any {
        this.url += '/tierraPRI-PVEM-PANAL';
        return this._http.get(this.url);
    }

}
