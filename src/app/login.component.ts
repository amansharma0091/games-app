import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.authenticationService.logout();
        setTimeout(()=>{
            this.login();
        },1000);
    }

    login() {
        this.authenticationService.login()
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } 
            });
    }
}
 
