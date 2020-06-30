
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../user/profile/profile.component';
import { EditProfileComponent } from '../user/edit-profile/edit-profile.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { SharedModule } from './../shared/shared.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { Tab3Page } from './tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3PageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialFileInputModule
  ],
  declarations: [Tab3Page, ProfileComponent, EditProfileComponent],
  
})
export class Tab3PageModule {}
