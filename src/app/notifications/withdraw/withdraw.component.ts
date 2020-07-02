import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { AlertService } from '../../services/alert.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  balance;

  public withdrawForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private wallet: WalletService,
    private ionLoader: LoaderService,
    private alert: AlertService
  ) {
    this.withdrawForm = formBuilder.group({
      amount: ['', [Validators.compose([Validators.pattern('^[0-9]*$'),
      Validators.required])]]
    });
   }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  withdraw() {
    this.showLoader();
    const amount = parseInt(this.withdrawForm.value.amount, 10);
    this.wallet.withdraw(amount).subscribe(resp => {
      this.hideLoader();
      this.alert.presentToast('Your request is with us');
    }, error => {
      this.hideLoader();
      console.error(error);
      this.alert.presentToast('Withdraw failed!');
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
