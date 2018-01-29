import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConsultaService {
  
  public url:string = 'http://api-finalfinal4.us-east-1.elasticbeanstalk.com/';

  constructor(private _http: Http) { }

  public getEvent(){
    return this._http.post(this.url, {});
  }

}
