import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LandingPagePage } from './landing-page/landing-page.page';
import { get, set, remove } from './services/storage';
import { HomePage } from './home/home.page';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from './services/auth.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('myNav', {static: false}) nav: NavController;
  public rootPage: any;
  token: any;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private auth: AuthService,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {

    // / Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    // Add or remove the "dark" class based on if the media query matches
    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle('dark', shouldAdd);
    }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    return get('token').then(
      data => {
        this.token = data;
        if (this.token !== null) {
          if ( this.route.snapshot['_routerState'].url !== '/app/tabs/home') {
            this.navCtrl.navigateForward('/app/tabs/home')
              .then();
          }
        } else {
          this.navCtrl.navigateRoot(`landing-page`);
        }
      },
      error => {
        this.token = null;
      }
    );
  }

  navigate() {
    const logged = this.auth.getToken();
    const loggedIn = this.auth.isLoggedIn;
    // const token = get('isLoggedIn') ? get('isLoggedIn') : '';
    // console.log(token);
    // const password = get('password') ? get('password') : '';
    console.log(get('token'));
    if (loggedIn) {
      console.log('sth');
      if ( this.route.snapshot['_routerState'].url !== '/app/tabs/home') {
        this.navCtrl.navigateForward('/app/tabs/home')
          .then();
      }
      // this.router.navigateByUrl('/app/tabs/home');
      // this.navCtrl.navigateRoot('/app/tabs/home');
    } else {
      this.navCtrl.navigateRoot(`landing-page`);
    }
  }

  // Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        // this.getLocationCoordinates();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
}
