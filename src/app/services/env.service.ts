import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://142.93.4.98:4500/api/';
  constructor() { }
}
