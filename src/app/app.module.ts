import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { GameService } from './game.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AuthenticationService } from './authentication.service';
import { JWTInterceptor } from './jwt.interceptor';
import { AuthGuard } from './auth-guard';


@NgModule({
  declarations: [
      AppComponent, LoginComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    AppRoutingModule
  ],
    providers: [ AuthenticationService, {provide : HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi:true},
                   AuthGuard,  GameService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
