import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }

  login(email: string, password: string) {
    return this.http.post(this.env.API_URL + 'auth/login',
      {email, password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(fName: string, lName: string, email: string, password: string) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName, lName, email, password}
    );
  }

  logout() {
    const headers = new HttpHeaders({
      Authorization: this.token.token_type + ' ' + this.token.access_token
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers })
    .pipe(
      tap(data => {
        this.storage.remove('token');
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    );
  }

  user() {
    const headers = new HttpHeaders({
      Authorization: this.token['token_type'] +' '+ this.token['access_token']
    });
    return this.http.get(this.env.API_URL + 'auth/user', { headers })
    .pipe(
      tap(user => {
        return user;
      })
    );
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }

}