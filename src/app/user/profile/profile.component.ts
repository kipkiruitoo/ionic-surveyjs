import { AuthService } from './../../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../../services/alert.service';


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
  ) { }

  ngOnInit() {}

  editProfile() {
    this.router.navigateByUrl('app/tabs/profile/edit-profile');
  }

  logout() {
    this.authService.logout().subscribe(resp => {
      this.alert.presentToast('Goodbye');
      this.router.navigate(['/login']);
    });
  }

}
