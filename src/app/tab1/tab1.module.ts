import { SharedModule } from './../shared/shared.module';

import { TimelineTimeComponent } from './../notifications/timeline-time/timeline-time.component';
import { TimelineItemComponent } from './../notifications/timeline-item/timeline-item.component';
import { TimelineComponent } from './../notifications/timeline/timeline.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';


import { IonicModule } from '@ionic/angular';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { Tab1Page } from './tab1.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1PageRoutingModule,
    IonCustomScrollbarModule,
    SharedModule
  ],
  declarations: [
    Tab1Page,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    ]
})
export class Tab1PageModule {}
