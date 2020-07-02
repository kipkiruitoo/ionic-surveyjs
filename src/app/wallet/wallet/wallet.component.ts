import { Component, OnInit, OnDestroy} from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WithdrawComponent } from '../../notifications/withdraw/withdraw.component';
import { modalEnterAnimation, modalLeaveAnimation } from '../../animations/index';
export interface OnEnter {
  onEnter(): Promise<void>;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, OnEnter, OnDestroy {

  balance: any;
  transactions: any;

  private subscription: Subscription;


  constructor(
    private wallet: WalletService,
    private router: Router,
    private modalCtrl: ModalController
    ) {}

  public async ngOnInit(): Promise<void> {
      await this.onEnter();

      this.subscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd && event.url === 'app/tabs/wallet') {
              this.onEnter();
          }
      });
  }

  public async onEnter(): Promise<void> {
      // do your on enter page stuff here
      this.getData();
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }



  getData() {
    this.wallet.balance().subscribe(res => {
      this.balance = res['balance'];
    }, error => {
      throw error;
      console.error(error);
    });

    this.wallet.transactions().subscribe(resp => {
      console.log(resp);
      this.transactions = resp['transactions'];
      this.transactions.forEach(element => {
        if (element.type === 'withdraw') {
          element.icon = 'remove_circle_outline';
        } else if (element.type === 'deposit') {
          element.icon = 'add_circle_outline';
        }
      });
      this.transactions.reverse();
    }, error => {
      throw error;
      console.error(error);
    });
  }

  withdraw() {
    this.showModal();
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: WithdrawComponent,
      enterAnimation: modalEnterAnimation,
      leaveAnimation: modalLeaveAnimation,
      componentProps: {
        balance: this.balance
      }

    });
    await modal.present();
  }

}
