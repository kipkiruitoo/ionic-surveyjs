import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
declare var SMSReceive: any;
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss'],
})
export class ConfirmCodeComponent implements OnInit {

  otp: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '30px'
    }
  };

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private router: Router,
    private loader: LoaderService,
    private alert: AlertService
  ) {
    this.start();
  }

  ngOnInit() {}

  onOtpChange(otp) {
    this.otp = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Read SMS
  start() {
    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          const IncomingSMS = e.data;
          this.processSMS(IncomingSMS);
        });
      },
      () => { console.log('watch start failed'); }
    );
  }

  stop() {
    SMSReceive.stopWatch(
      () => { console.log('watch stopped'); },
      () => { console.log('watch stop failed'); }
      );
  }

  processSMS(data) {
    // Check SMS for a specific string sequence to identify it is you SMS
    // Design your SMS in a way so you can identify the OTP quickly i.e. first 6 letters
    // In this case, I am keeping the first 6 letters as OTP
    const message = data.body;
    if (message && message.indexOf('Maoni') !== -1) {

      const str = data.body;
      this.otp = str.replace(/[^0-9]/g, '');
      this.verify(this.otp);
      this.stop();
    }
  }

  confirm() {
    this.verify(this.otp);
  }

  verify(otp) {
    const $token  = {
      token: otp
    };
    this.showLoader();
    this.auth.confirmSMS($token).subscribe( resp => {
      this.hideLoader();
      this.alert.presentToast('Verification Successful!');
      this.modalCtrl.dismiss();
      this.router.navigate(['/login']);
    }, error => {
      this.hideLoader();
      console.error(error);
      this.alert.presentToast('Verification Failed, Wrong Code!');
      throw error;
    });
  }

  resend() {
    this.showLoader();
    const empty = '';
    this.auth.resendSMS(empty).subscribe( resp => {
      this.hideLoader();
      this.alert.presentToast('Code Resent');
    }, error => {
      this.hideLoader();
      console.error(error);
      this.alert.presentToast('Resending Code Failed!');
      throw error;
    });
  }

  showLoader() {
    this.loader.showLoader();
  }

  hideLoader() {
    this.loader.hideLoader();
  }




}
