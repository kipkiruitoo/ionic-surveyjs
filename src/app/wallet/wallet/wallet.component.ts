import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  logs = [
    {time: new Date(), title: 'Withdraw', amount: '100', icon: 'remove_circle_outline'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Payment',  amount: '100', icon: 'add_circle_outline'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Withdraw',  amount: '200', icon: 'remove_circle_outline'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Withdraw',  amount: '300', icon: 'remove_circle_outline'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Withdraw', amount: '400', icon: 'remove_circle_outline'},
  // tslint:disable-next-line: max-line-length
  {time: new Date(), title: 'Payment',  amount: '600', icon: 'add_circle_outline'} ];
  constructor() { }

  ngOnInit() {}

  withdraw() {}

}
