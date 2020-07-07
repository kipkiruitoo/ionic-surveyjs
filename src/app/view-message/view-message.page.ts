import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { throwError } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { CompleteSurveyComponent } from '../notifications/complete-survey/complete-survey.component';
import { modalEnterAnimation, modalLeaveAnimation } from '../animations/index';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
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

  locationCoords: any;
  timetest: any;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {

    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: ''
    };
    this.timetest = Date.now();

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
        // this.json['completedHtml'] = '<p><h4>Thank you for asking and answering.</p></h4>';
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
        this.showModal();
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

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: CompleteSurveyComponent,
      enterAnimation: modalEnterAnimation,
      leaveAnimation: modalLeaveAnimation
    });
    await modal.present();

  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
}
