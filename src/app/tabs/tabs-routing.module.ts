import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(
            (m) => m.HomePageModule
          ),

      },
      {
        path: 'notifications',
            loadChildren: () =>
              import('../tab1/tab1.module').then(
                (m) => m.Tab1PageModule
              ),
      },
      {
        path: 'wallet',
            loadChildren: () =>
              import('../tab2/tab2.module').then(
                (m) => m.Tab2PageModule
              ),
      },
      {
        path: 'profile',
            loadChildren: () =>
              import('../tab3/tab3.module').then(
                (m) => m.Tab3PageModule
              ),
      },
      {
        path: 'refresh',
            loadChildren: () =>
              import('../tab4/tab4.module').then(
                (m) => m.Tab4PageModule
              ),
      },
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
