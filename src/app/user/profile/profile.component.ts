import { Component, OnInit, ViewEncapsulation } from '@angular/core';
const DATA = {
  accountId: '10020',
  accountType: 'CHK',
  nickname: 'My account',
  formattedAccountNumber: '(...6001)',
  accountNumber: '0000006001-DDA',
  alternateAccountNumber: '0000006001',
  isAsset: true,
  isLiability: false,
  branchNumber: '1',
  ownerName: null,
  openDate: null,
  balances: [
    {
      type: 'available',
      amount: 19721.64
    },
    {
      type: 'current',
      amount: 19721.64
    }
  ],
  details: [
    {
      label: "Today's beginning Balance",
      value: '19721.64'
    },
    {
      label: 'Available Balance',
      value: '$19,721.64'
    },
    {
      label: 'Interest Paid Year to Date',
      value: '$0.00'
    },
    {
      label: 'Interest Paid Last Year',
      value: '$0.00'
    },
    {
      label: 'Hold Balance',
      value: '.00'
    },
    {
      label: 'Current Balance',
      value: '$19,721.64'
    }
  ]
};
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'account-detail-card'
  }
})
export class ProfileComponent implements OnInit {
  account = DATA;
  img = 'https://picsum.photos/300';
  constructor() { }

  ngOnInit() {}

}
