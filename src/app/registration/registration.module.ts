import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../shared/shared.module';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { RegistrationPage } from './registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    IonCustomScrollbarModule,
    SharedModule
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
