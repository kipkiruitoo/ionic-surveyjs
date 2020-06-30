import {
  SettingsComponent
} from './../../notifications/settings/settings.component';
import {
  AuthService
} from './../../services/auth.service';
import {
  NavController
} from '@ionic/angular';
import {
  Router
} from '@angular/router';
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AlertService
} from '../../services/alert.service';
import {
  PopoverController
} from '@ionic/angular';
import {
  WalletService
} from '../../services/wallet.service';

import {
  Camera,
  CameraOptions
} from '@ionic-native/camera/ngx';
import {
  ActionSheetController
} from '@ionic/angular';
// import {
//   File
// } from '@ionic-native/file/ngx';
import { LoaderService } from '../../services/loader.service';

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
  profile = [];
  balance: any;

  croppedImagepath = '';
  isLoading = false;

  files  = [];
  fileToUpload: File = null;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private alert: AlertService,
    public popoverCtrl: PopoverController,
    private wallet: WalletService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private ionLoader: LoaderService

    // private file: File

  ) {
    this.getdata();
  }

  ngOnInit() {}

  editProfile() {
    this.router.navigateByUrl('app/tabs/profile/edit-profile');
  }

  getdata() {
    this.authService.getUser().subscribe(res => {
      this.profile.push(res);
      this.profile.forEach(element => {
        if (element.avatar !== '') {
          element.img = 'https://maoni.club' + element.avatar;
        }
      });
      console.log(this.profile);
    });
    this.wallet.balance().subscribe(res => {
      this.balance = res['balance'];
    }, error => {
      throw error;
      console.error(error);
    });
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

  handleFileInput(files: FileList) {
    this.showLoader();
    this.fileToUpload = files.item(0);
    this.files.push({ data: this.fileToUpload, inProgress: false, progress: 0});
    // this.uploadFiles(this.files);
    console.log(this.files);
    this.save();
    }

    save() {
      this.files.forEach(file => {
        this.uploadFile(file);
      });
    }

    uploadFile(file) {
      const formData = new FormData();
      formData.append('avatar', file.data);
      this.authService.uploadImage(formData).subscribe(resp => {
        console.log(resp);
        this.hideLoader();
        location.reload();
        this.alert.presentToast('Avatar Updated');
      }, error => {
        this.hideLoader();
        console.log(error);
      });
    }

    showLoader() {
      this.ionLoader.showLoader();
    }

    hideLoader() {
      this.ionLoader.hideLoader();
    }
}
