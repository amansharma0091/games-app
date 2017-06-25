import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Game } from './game';


@Injectable()
export class GameService {

  private options: RequestOptions;
 

  constructor(private http: Http)  {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  public getAllGames(): Observable<Game[]> {
    const url = 'http://localhost:8080/api/findall';
    return this.http.get(url)
      .map(resp => {
        return resp.json();
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    // In production use logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
