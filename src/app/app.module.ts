import { EventsService } from './services/events.service';
import { LoaderService } from './services/loader.service';
import { EnvService } from './services/env.service';
import { DataService } from './services/data.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule,  IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AndroidPermissions} from '@ionic-native/android-permissions/ngx';

// import { SurveyComponent } from "./survey/survey.component";

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NativeStorage } from '@ionic-native/native-storage';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { TokenInterceptor } from './interceptors/interceptor/token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './notifications/settings/settings.component';

@NgModule({
  declarations: [AppComponent, SettingsComponent],
  entryComponents: [SettingsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    // NativeStorage
  ],
  providers: [
    StatusBar,
    AndroidPermissions,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // AuthGuard,
    // NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AlertService,
    AuthService,
    DataService,
    EnvService,
    LoaderService,
    EventsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
