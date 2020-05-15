import { AlertService } from './../services/alert.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsernameValidator } from '../validators/username';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
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
export class RegistrationPage implements OnInit {

  logoState: any = 'in';
  cloudState: any = 'in';
  loginState: any = 'in';
  formState: any = 'in';

  public registerForm: FormGroup;

  public submitAttempt = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      // tslint:disable-next-line: max-line-length
      name: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('[a-zA-Z]*')])],
      confirm_password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  register() {
    this.submitAttempt = true;
    console.log(this.registerForm.value);
    const data = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirm_password: this.registerForm.value.confirm_password,
    };
    this.authService.register(data).subscribe(res => {
      this.alert.presentToast(res['message']);
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
      this.alert.presentToast('Sign Up failed!');
      throw error;
    });
  }

  

}
