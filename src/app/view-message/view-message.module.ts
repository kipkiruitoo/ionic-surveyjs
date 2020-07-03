import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewMessagePage } from './view-message.page';
import { SurveyComponent } from '../survey/survey.component';
import { IonicModule } from '@ionic/angular';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';
import { ViewMessagePageRoutingModule } from './view-message-routing.module';
import { SharedModule } from './../shared/shared.module';
@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    IonCustomScrollbarModule,
    SharedModule,
    ViewMessagePageRoutingModule
  ],
  declarations: [SurveyComponent, ViewMessagePage]
})
export class ViewMessagePageModule {}
