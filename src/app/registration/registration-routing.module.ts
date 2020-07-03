import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationPage } from './registration.page';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  },
  // {
  //   path: 'confirm',
  //   component: ConfirmCodeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule {}
