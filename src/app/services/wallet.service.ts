import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
// import { NativeStorage } from '@ionic-native/native-storage';
import { EnvService } from './env.service';
import { get, set, remove } from '../services/storage';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  balance() {
    return this.http.get(this.env.API_URL + 'auth/balance'
    );
  }

  transactions() {
    return this.http.get(this.env.API_URL + 'auth/transactions'
    );
  }

  withdraw(amount) {
    return this.http.get(this.env.API_URL + 'auth/withdraw/' + amount
    );
  }
}
