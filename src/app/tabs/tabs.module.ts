// import { Tab3Page } from './../tab3/tab3.page';
// import { Tab2Page } from './../tab2/tab2.page';
// import { Tab1Page } from './../tab1/tab1.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
    ]
})
export class TabsPageModule {}
