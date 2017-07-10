
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public token: string;
    baseUrl = 'https://games-api-dev.herokuapp.com/api/auth';

    constructor(private httpClient: HttpClient) {
        this.login();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(): Observable<boolean> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.httpClient.post(this.baseUrl, JSON.stringify({ username: "username", password: "password" }),
        { headers : headers, observe: 'response', responseType: 'json'})
        .map((response : HttpResponse<any>)=>{
            //let token = response.json() && response.json().token;
            let token = response.body.token;
            console.log("rsponse :+"+JSON.stringify(response))
            if (token) {
                this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ username: "username", token:token }));
                return true;
            } else {
                return false;
            }
        });

    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getToken(): string{
        return this.token;
    }
}
