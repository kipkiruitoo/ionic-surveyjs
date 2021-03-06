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
import { NgOtpInputModule } from 'ng-otp-input';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TokenInterceptor } from './interceptors/interceptor/token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './notifications/settings/settings.component';
import { ConfirmCodeComponent } from './registration/confirm-code/confirm-code.component';
import { CompleteSurveyComponent } from './notifications/complete-survey/complete-survey.component';
import { WithdrawComponent } from './notifications/withdraw/withdraw.component';
import { fancyAnimation } from './animations';
import { WebView } from '@ionic-native/ionic-webview/ngx';
// import { File, FileEntry } from '@ionic-native/file/ngx';
// import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';

// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ConfirmCodeComponent,
    CompleteSurveyComponent,
    WithdrawComponent],
  entryComponents: [
    SettingsComponent,
    ConfirmCodeComponent,
    CompleteSurveyComponent,
    WithdrawComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({navAnimation: fancyAnimation}),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule
    // NativeStorage
  ],
  providers: [
    StatusBar,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
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
    EventsService,
    WebView,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
