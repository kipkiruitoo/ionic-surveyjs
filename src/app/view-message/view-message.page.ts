import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { throwError } from 'rxjs';

// import { SurveyComponent } from "../survey/survey.component"
@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message: Message;
  survey: any;
  json: any;
  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.survey = this.showSurvey(id);
  }

  ngOnInit() {
    
    // console.log(this.survey);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Maoni' : '';
  }

  showSurvey(id) {
    this.data.showSurvey(id).subscribe(
      (result: any) => {
        console.log(result);
        this.survey = result.data;
        this.json = result.data.json;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitSurvey($event) {
    this.authService.getUser().subscribe(user => {
      console.log($event);
      console.log(this.survey.id, );
      console.log(user );
      const data = {
        user_id: user['id'],
        json: $event
      };
      console.log(data);
      this.data.submitSurvey(this.survey.id, data).subscribe( resp => {
        console.log(resp);
      }, error => {
        console.error(error);
        throwError(error);
      });
    }, error => {
      console.error(error);
      throwError(error);
    });
    
  }
}
