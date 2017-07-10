import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Game } from './game';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class GameService {

    private options: any

    private baseUrl = "https://games-api-dev.herokuapp.com/api";
    private token: string;

    constructor(private http: HttpClient) {
        this.getHeaders();
    }

    private getHeaders(): void {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        this.options = { headers: headers, observe:'body', responseType: 'json', withCredentials:true };
    }
   
    public getAllGames(): Observable<any> {
        return this.http.get(`${this.baseUrl}/findall`, this.options)
    }

    public find(text: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/find?title=${text}`, this.options) 
    }


    private handleError(error: Response | any) {
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
