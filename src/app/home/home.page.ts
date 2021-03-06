import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cards;

  constructor(private data: DataService, private router: Router) {
    this.cards = [];
    this.getSurveys();
  }

  urls = 'https://picsum.photos/300';
  surveys: any;
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  loadTinderCards() {
    // this.getSurveys();
    this.surveys.forEach(element => {
      element.image = 'https://maoni.club/images/' + element.image;
    });
    console.log(this.surveys);
    this.cards = this.surveys;
  }

  logChoice(value) {
    console.log(value);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getSurveys() {
    this.data.getSurveys().subscribe(
      (result: any) => {
        console.log(result);
        this.surveys = result.data;
        this.loadTinderCards();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  showSurvey(id) {
    this.data.showSurvey(id).subscribe(
      (result: any) => {
        console.log(result);
        this.surveys = result.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  navigate(id) {
    this.router.navigate(['/survey/' + id]);
  }
}
