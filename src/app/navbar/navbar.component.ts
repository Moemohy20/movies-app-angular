import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthenticationService: AuthenticationService) {}
  isLogin: boolean = false;

  ngOnInit(): void {
    this._AuthenticationService.userData.subscribe(() => {
      if (this._AuthenticationService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  callLogout() {
    this._AuthenticationService.logOut();
  }
}
