import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';

import { AuthService } from '../../auth/index';
import { User } from '../../library/objects/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = false;
  user: User;
  loggedIn: User;
  userSubscription: ISubscription;


  temp:string;

  constructor(public authService: AuthService,
              private router: Router) {
    this.user = new User();
   }

  ngOnInit() {

  }

  login() {
    console.log("login");
    this.authService.login(this.user).subscribe(() => {
          console.log(this.authService.isLoggedIn);
          if (this.authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/user';

            // // Redirect the user
            this.router.navigate([redirect]);
          }
        });
  }

  register() {
    console.log("register");
    this.authService.register(this.user).subscribe(() => {
          if (this.authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/user/profile';

            // Redirect the user
            this.router.navigate([redirect]);
          }
        });
  }
}
