import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  public editProfile: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService,
    private alert: AlertService
  ) {
    this.editProfile = this.formBuilder.group({
      email: [''],
      username: [''],
      phone: [''],
      password: ['']
  });
    this.getData();
  }

  ngOnInit() {}

  update() {
    console.log(this.editProfile.value);
    const data = this.editProfile.value;
    this.auth.updateUser(data).subscribe(resp => {
      this.alert.presentToast('Profile Updated');
      // this.navCtrl.navigateBack('/profile');
    }, error => {
      throw error;
      console.log(error);
    });
  }

  getData() {
    this.auth.getUser().subscribe(res => {
      this.editProfile.patchValue({username: res['name']});
      this.editProfile.patchValue({email: res['email']});
      this.editProfile.patchValue({phone: res['phonenumber']});
    }, error => {
      throw error;
      console.log(error);
    });
  }

}
