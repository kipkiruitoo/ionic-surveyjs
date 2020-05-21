import { SlideWelcomeComponent } from './slide-welcome/slide-welcome.component';
import { SlideSurveyComponent } from './slide-survey/slide-survey.component';
import { SlidePayComponent } from './slide-pay/slide-pay.component';
import { StartButtonComponent } from './start-button/start-button.component';
import { SlidesComponent } from './slides/slides.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPagePageRoutingModule } from './landing-page-routing.module';

import { LandingPagePage } from './landing-page.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPagePageRoutingModule
  ],
  declarations: [
    LandingPagePage,
    StartButtonComponent,
    SlidesComponent,
    SlideWelcomeComponent,
    SlideSurveyComponent,
    SlidePayComponent
  ]
})
export class LandingPagePageModule {}
