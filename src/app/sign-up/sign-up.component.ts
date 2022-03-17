import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}

  error: string = '';
  signUpForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(80),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z]{2,5}$/),
    ]),
  });
  submitSignUp(formInfo: FormGroup) {
    this._AuthenticationService
      .signUpAuth(formInfo.value)
      .subscribe((response) => {
        if (response.message == 'success') {
          // go to login
          this._Router.navigate(['/signIn']);
        } else {
          this.error = 'email is already registered';
        }
      });
  }
  ngOnInit(): void {}
}
