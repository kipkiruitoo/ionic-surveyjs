import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageModule } from './login/login.module';
import { RegistrationPageModule } from './registration/registration.module';
import { ViewMessagePageModule } from './view-message/view-message.module';
import { LandingPagePageModule } from './landing-page/landing-page.module';
import { HomePageModule } from './home/home.module';
import { ForgotPasswordPageModule } from './forgot-password/forgot-password.module';
import { TabsPageModule } from './tabs/tabs.module';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule , canActivate: [AuthGuard] ),
  // },
  {
    path: 'survey/:id',
    loadChildren: () =>
      import('./view-message/view-message.module').then(
        (m) => m.ViewMessagePageModule
      ), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}


