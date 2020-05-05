import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-time',
  templateUrl: './timeline-time.component.html',
  styleUrls: ['./timeline-time.component.scss'],
})
export class TimelineTimeComponent implements OnInit {

  @Input('time') time = {};
  constructor() { }

  ngOnInit() {}

}
