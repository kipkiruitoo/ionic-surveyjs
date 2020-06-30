import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  balance: any;
  transactions: any;

  constructor(
    private wallet: WalletService
    ) {
      this.getData();
    }

  ngOnInit() {}

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

  withdraw() {}

}
