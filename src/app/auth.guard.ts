import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
// export const authGuard: CanActivateFn = (route, state) => {
//   constructor(private authService: AuthService, private router: Router) {}
//   return true;
// };
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getUserRole();

    // if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    if (expectedRole && expectedRole !== userRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
