import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-slide-survey',
  templateUrl: './slide-survey.component.html',
  styleUrls: ['./slide-survey.component.scss'],
  animations: [
    // For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(2000px,0,0)'}),
        animate('500ms ease-in-out')
      ])
    ]),
  ]
})
export class SlideSurveyComponent implements OnInit {

  logoState: any = 'in';
  constructor() { }

  ngOnInit() {}

}
