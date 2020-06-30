import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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
