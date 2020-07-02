import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CountryCodes } from '../registration/country_codes';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public messages: Message[] = [
  ];

  public countries: Subject < any > = new BehaviorSubject<Array<CountryCodes>>(null);
  private countriesUrl = 'assets/countrycodes/country.json';

  constructor(private http: HttpClient) {}

  public getContries(): Observable<any> {
    return this.http.get(this.countriesUrl);
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getSurveys() {
    const url = 'https://maoni.club/api/survey';
    return this.http.get(url);
  }

  public showSurvey(id) {
    const url = 'https://maoni.club/api/survey/' + id;
    return this.http.get(url);

  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public submitSurvey(id, data) {
    const url = 'https://maoni.club/api/survey/' + id + '/result';
    return this.http.post(url, data);
  }
}
