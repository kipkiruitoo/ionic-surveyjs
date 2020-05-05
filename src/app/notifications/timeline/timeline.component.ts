import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {

  @Input('endIcon') endIcon = 'ionic';
  logs = [
    {time: new Date(), title: 'Level Up', description: 'testing 1, testing 1, testing 1, testing 1', class: 'positive', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Payment', description: 'testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2', class: 'royal', icon: 'card'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Level Up', description: 'testing 3 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2', class: 'calm', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Level Up', description: 'testing 4 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2', class: 'balanced', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Level Up', description: 'testing 5 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2', class: 'energized', icon: 'arrow-up'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Payment', description: 'testing 6 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2 testing 2', class: 'positive', icon: 'card'} ];
  constructor() { }

  ngOnInit() {}

}
