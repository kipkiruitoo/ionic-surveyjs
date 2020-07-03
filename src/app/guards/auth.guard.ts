import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { get, set, remove } from '../services/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token: any;
  isLoggedIn: any;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const sth: any = this.getSth().then(value => {
      });
      if (sth) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }

  getSth() {
    const log = false;
    return  get('token').then(
      data => {
        this.token = data;
        if (this.token !== null) {
          console.log('sth');
          return  true;
        } else {
          return false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }

}
