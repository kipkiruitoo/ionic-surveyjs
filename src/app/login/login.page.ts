import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from './../services/alert.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

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
    private alert: AlertService
    ) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  login() {
    this.submitAttempt = true;
    console.log(this.loginForm.value);
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(data).subscribe(res => {
      console.log(res);
      this.alert.presentToast('Welcome');
      this.navCtrl.navigateRoot(`app/tabs/home`);
    }, error => {
      console.error(error);
      this.alert.presentToast('Sign In failed!');
      throw error;
    });
  }

}
