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
import { IonicSelectableComponent } from 'ionic-selectable';
import { LoaderService } from '../services/loader.service';
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
  country: any;

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
    private modalCtrl: ModalController,
    private ionLoader: LoaderService
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

  signup() {
    this.submitAttempt = true;
    this.showLoader();
    // console.log(this.country.name);
    this.countries.forEach(element => {
      if (element.name === this.country.name) {
        this.phoneNumber = element.dial_code + this.registerForm.value.phone;
        const data = {
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          phonenumber: this.phoneNumber,
          country: this.country.name,
          password: this.registerForm.value.password,
          confirm_password: this.registerForm.value.confirm_password,
        };
        const logindata = {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        };
        // console.log(this.countries);
        this.authService.register(data).subscribe(res => {
          this.authService.login(logindata).subscribe(resp => {
            this.hideLoader();
            this.alert.presentToast(res['message']);
            this.openModal();
          }, error => {
            this.hideLoader();
          });
          // this.router.navigate(['/login']);
        }, error => {
          const err = error.error;
          this.hideLoader();
          // console.log(err[Object.keys(err)[0]]);
          const fieldValues = err[Object.keys(err)[0]];
          const keys = Object.keys(err[Object.keys(err)[0]]);
          const msg = keys.map(k => fieldValues[k]);
          this.alert.presentToast(msg);
          throw error;
        });
      }
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ConfirmCodeComponent
    });
    return await modal.present();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  showLoader() {
    this.ionLoader.showLoader();
  }

  hideLoader() {
    this.ionLoader.hideLoader();
  }


}
