import { SettingsComponent } from './../../notifications/settings/settings.component';
import { AuthService } from './../../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { PopoverController } from '@ionic/angular';

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

  img = 'https://picsum.photos/300';
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private alert: AlertService,
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  editProfile() {
    this.router.navigateByUrl('app/tabs/profile/edit-profile');
  }

  

  async settings(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: SettingsComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
  }

}
