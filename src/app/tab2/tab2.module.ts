import { SharedModule } from './../shared/shared.module';
import { WalletComponent } from './../wallet/wallet/wallet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [Tab2Page, WalletComponent]
})
export class Tab2PageModule {}
