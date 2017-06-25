import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Game } from './game';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class GameService {

    private options: RequestOptions;

    private baseUrl = "https://games-api-dev.herokuapp.com/api/";
    private token: string;

    constructor(private http: Http, private authService : AuthenticationService) {
        this.getHeaders();
    }
    private getHeaders(): void {
        let headers = new Headers({ 'Authorization': this.authService.token });
        headers.set('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: headers,withCredentials:true });
    }
   
    public getAllGames(): Observable<Game[]> {
        const url = this.baseUrl + 'findall';
        return this.http.get(url, this.options)
            .map(resp => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    public find(text: string): Observable<Game[]> {
        const url = this.baseUrl + '/find?title=' + text;
        return this.http.get(url, this.options)
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
