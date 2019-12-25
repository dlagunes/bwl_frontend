import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth-service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    try {
      if (this.auth.authenticated) { return true; }

      if (this.auth.currentUserObservable) {
        return this.auth.currentUserObservable
          .take(1)
          .map(user => !!user)
          .do(loggedIn => {
            if (!loggedIn) {
              Swal.fire('Es necesario autenticarse para ingresar.');
              this.router.navigate(['login']);
            }
          });
      } else {
        Swal.fire('Es necesario autenticarse para ingresar.');
        this.router.navigate(['login']);
      }
    } catch (error) {
      Swal.fire('Por favor, comuníquese con soporte.');
      this.router.navigate(['login']);
    }
  }
}
