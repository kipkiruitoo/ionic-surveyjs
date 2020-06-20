import { EventsService } from './../../services/events.service';
import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PopoverController, NavParams } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  page;
  constructor(
    private router: Router,
    private authService: AuthService,
    private alert: AlertService,
    private events: EventsService,
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    // Get data from popover page
    this.page = this.navParams.get('data');
  }

  logout() {
    this.authService.logout().subscribe(resp => {
      this.popoverController.dismiss();
      this.alert.presentToast('Goodbye');
      this.router.navigate(['/login']);
    });
  }

  // eventFromPopover() {
  //   this.events.publish('fromPopoverEvent');
  //   this.popoverController.dismiss();
  // }

}
