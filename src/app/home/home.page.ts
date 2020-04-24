import { Component } from "@angular/core";
import { DataService, Message } from "../services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(private data: DataService, private router: Router) {
    this.getSurveys();
  }
  surveys: any;
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getSurveys() {
    this.data.getSurveys().subscribe(
      (result: any) => {
        console.log(result);
        this.surveys = result.data;
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
    this.router.navigate(["/survey/" + id]);
  }
}
