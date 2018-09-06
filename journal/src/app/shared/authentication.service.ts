import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("In the authentication guard service!");
    if (sessionStorage.getItem('name')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    //, { queryParams: { returnUrl: state.url }}
    this.router.navigate(['/login']);
    return false;
  }
}
