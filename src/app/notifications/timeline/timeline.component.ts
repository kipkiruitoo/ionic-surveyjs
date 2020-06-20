import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {

  @Input('endIcon') endIcon = 'ionic';
  logs = [
    {time: new Date(), title: 'Level Up', description: '10 points', class: 'positive', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Payment', description: '100', class: 'royal', icon: 'card'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Level Up', description: '20 points', class: 'calm', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Level Up', description: '15 points', class: 'balanced', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Level Up', description: '30 points', class: 'energized', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Payment', description: '100', class: 'positive', icon: 'card'} ];
  constructor() { }

  ngOnInit() {}

}
