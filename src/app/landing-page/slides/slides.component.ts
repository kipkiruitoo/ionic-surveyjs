import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  animations: [
    // For the logo
    trigger('zoomInZoomOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,0,1000px)'}),
        animate('2000ms ease-in-out')
      ])
    ]),
    // For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(2000px,0,0)'}),
        animate('2000ms ease-in-out')
      ])
    ]),
  ]
})
export class SlidesComponent implements OnInit {

  @ViewChild('slides', { static: false }) slides: IonSlides;
  logoState: any = 'in';
  slideOpts = {
    speed: 400
  };
  currentIndex = 0;

  constructor() { }

  slideChanged() {

    this.slides.getActiveIndex().then( index => {
      this.currentIndex = index;
    });
    console.log('Current index is', this.currentIndex);
  }

  ngOnInit() {}

}
