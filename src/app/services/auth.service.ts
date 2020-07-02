import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
// import { NativeStorage } from '@ionic-native/native-storage';
import { EnvService } from './env.service';
import { get, set, remove } from '../services/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    // private storage: NativeStorage,
    private env: EnvService,
  ) { }

  login(data) {
    return this.http.post(this.env.API_URL + 'auth/login',
      data
    ).pipe(
      tap(token => {
        // this.storage.setItem('token', token)
        set('token', token)
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

  $isLoggedIn() {
    return !this.isLoggedIn;
  }

  register(data) {
    return this.http.post(this.env.API_URL + 'auth/signup',
      data
    );
  }

  logout() {
    // const headers = new HttpHeaders({
    //   Authorization: this.token.token_type + ' ' + this.token.access_token
    // });
    return this.http.get(this.env.API_URL + 'auth/logout')
    .pipe(
      tap(data => {
        // this.storage.remove('token');
        remove('token');
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    );
  }

  user() {
    const headers = new HttpHeaders({
      Authorization: this.token['token_type'] + ' ' + this.token['access_token']
    });
    return this.http.get(this.env.API_URL + 'auth/user', { headers })
    .pipe(
      tap(user => {
        return user;
      })
    );
  }

  getToken() {
    return get('token').then(
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

  getUser() {
    return this.http.get(this.env.API_URL + 'auth/getuser')
    .pipe(
      tap(user => {
        return user;
      })
    );
  }

  updateUser(data) {
    return this.http.post(this.env.API_URL + 'auth/updateuser', data);
  }

  uploadImage(img) {
    return this.http.post(this.env.API_URL + 'auth/updateavatar', img);
  }


  confirmSMS(otp) {
    return this.http.post(this.env.API_URL + 'auth/mobile/verify', otp);
  }

  resendSMS(phone) {
    return this.http.post(this.env.API_URL + 'auth/mobile/verify', phone);
  }


}
