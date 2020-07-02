import {
  AlertService
} from './../services/alert.service';
import {
  AuthService
} from './../services/auth.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';
import {
  NavController
} from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  DataService
} from '../services/data.service';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { ModalController } from '@ionic/angular';

// import { UsernameValidator } from '../validators/username';
import {
  Router
} from '@angular/router';

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
        style({
          transform: 'translate3d(0,2000px,0'
        }),
        animate('2000ms ease-in-out')
      ])
    ]),

    // For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({
          transform: 'translate3d(0,2000px,0)'
        }),
        animate('1000ms ease-in-out')
      ])
    ]),

    // For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('2000ms', style({
          opacity: 1
        })),
      ])
    ]),

    // For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
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
  countries = [];

  phoneNumber: any;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  public registerForm: FormGroup;

  public submitAttempt = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private data: DataService,
    private modalCtrl: ModalController
  ) {
    this.getServiceFields();
    this.registerForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', [Validators.compose([Validators.maxLength(9), Validators.pattern('^[0-9]*$'),
        Validators.minLength(9), Validators.required
      ])]],
      country: ['', Validators.required],
      // tslint:disable-next-line: max-line-length
      name: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('[a-zA-Z]*')])],
      confirm_password: ['', Validators.required]
    });
  }


  getServiceFields() {
    this.data.getContries().subscribe(data => {
      this.countries = data;
    });
  }

  ngOnInit() {}

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  register() {
    this.submitAttempt = true;
    // console.log(this.countries);
    // this.countries.forEach(element => {
    //   if (element.name === this.registerForm.value.country) {
    //     this.phoneNumber = element.dial_code + this.registerForm.value.phone;
    //     const data = {
    //       name: this.registerForm.value.name,
    //       email: this.registerForm.value.email,
    //       phone: this.phoneNumber,
    //       country: this.registerForm.value.country,
    //       password: this.registerForm.value.password,
    //       confirm_password: this.registerForm.value.confirm_password,
    //     };
    //     this.authService.register(data).subscribe(res => {
    //       this.alert.presentToast(res['message']);
    //       this.router.navigate(['/login']);
    //     }, error => {
    //       console.error(error);
    //       this.alert.presentToast('Sign Up failed!');
    //       throw error;
    //     });
    //   }
    // });
    this.openModal();

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ConfirmCodeComponent
    });
    return await modal.present();
  }



}