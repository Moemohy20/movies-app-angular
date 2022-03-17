import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegister } from './user-register';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _HttpClient: HttpClient, private Router: Router) {
    if (localStorage.getItem('token') != null) {
      this.setUserData();
    }
  }

  userData = new BehaviorSubject(null);

  setUserData(): void {
    let encodedToken: string = JSON.stringify(localStorage.getItem('token'));
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

  signUpAuth(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://route-egypt-api.herokuapp.com/signup',
      userData
    );
  }
  signInAuth(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://route-egypt-api.herokuapp.com/signin',
      userData
    );
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.userData.next(null);
    this.Router.navigate(['/signIn']);
  }
}
