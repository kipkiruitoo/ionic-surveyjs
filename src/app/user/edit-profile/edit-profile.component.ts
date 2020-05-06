import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  private editProfile: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {
    this.editProfile = this.formBuilder.group({
      email: ['', Validators.required],
      fullname: ['', Validators.required],
      number: ['', Validators.required],
      password: ['', Validators.required]
  });
    this.getData();
  }

  ngOnInit() {}

  submitForm() {
    console.log(this.editProfile.value);
    this.navCtrl.navigateBack('/profile');
  }

  getData() {
    const fullname = this.editProfile.patchValue({fullname: 'John Doe'});
    const $number = this.editProfile.patchValue({number: +254754789098});
    const email = this.editProfile.patchValue({email: 'john.doe@example.com'});
  }

}
