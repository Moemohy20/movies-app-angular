import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}

  error: string = '';
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z]{2,5}$/),
    ]),
  });
  submitSignIn(formInfo: FormGroup) {
    this._AuthenticationService
      .signInAuth(formInfo.value)
      .subscribe((response) => {
        if (response.message == 'success') {
          // go to login
          localStorage.setItem('token', response.token);
          this._AuthenticationService.setUserData();
          this._Router.navigate(['/home']);
        } else {
          this.error = 'email or password is wrong ';
        }
      });
  }
  ngOnInit(): void {}
}
