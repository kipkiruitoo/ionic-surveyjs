import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../user/profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { Tab3Page } from './tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3PageRoutingModule,
    MaterialModule
  ],
  declarations: [Tab3Page, ProfileComponent]
})
export class Tab3PageModule {}
