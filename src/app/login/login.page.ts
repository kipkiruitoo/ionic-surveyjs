import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from './../services/alert.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [

    // For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    // For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    // For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 })),
      ])
    ]),

    // For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage implements OnInit {

  passwordType = 'password';
  passwordIcon = 'eye-off';


  logoState: any = 'in';
  cloudState: any = 'in';
  loginState: any = 'in';
  formState: any = 'in';

  public loginForm: FormGroup;

  public submitAttempt = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private ionLoader: LoaderService
    ) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  login() {
    this.submitAttempt = true;
    // this.navCtrl.navigateRoot(`app/tabs/home`);
    this.showLoader();
    // console.log(this.loginForm.value);
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    // this.navCtrl.navigateRoot(`app/tabs/home`);
    this.authService.login(data).subscribe(res => {
      console.log(res);
      this.hideLoader();
      this.alert.presentToast('Welcome');
      this.navCtrl.navigateRoot(`app/tabs/home`);
    }, error => {
      this.hideLoader();
      // console.error(error.error);
      const err = error.error;
      // console.log(err[Object.keys(err)[0]]);
      // const fieldValues = err[Object.keys(err)[0]];
      // const keys = Object.keys(err[Object.keys(err)[0]]);
      // const msg = keys.map(k => fieldValues[k]);
      const msg = err[Object.keys(err)[0]];
      this.alert.presentToast(msg);
      throw error;
    });
  }

  showLoader() {
    this.ionLoader.showLoader();
  }

  hideLoader() {
    this.ionLoader.hideLoader();
  }

}
