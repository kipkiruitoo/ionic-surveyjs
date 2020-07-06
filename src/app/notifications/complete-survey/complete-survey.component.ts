import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-complete-survey',
  templateUrl: './complete-survey.component.html',
  styleUrls: ['./complete-survey.component.scss'],
})
export class CompleteSurveyComponent implements OnInit {

  img = 'http://clipart-library.com/images/rcjGggkKi.jpg';
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,

  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot(`app/tabs/home`);
  }

}
