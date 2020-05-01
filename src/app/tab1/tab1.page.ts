import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

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
  
  ngOnInit() {

  }

}
