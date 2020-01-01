import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LinkedInService } from 'src/app/services/linked-in.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  postData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private linkedin: LinkedInService,
    private loading:LoadingService
  ) { }

  ngOnInit() { }

  validateInputs() {
    let email = this.postData.email.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.email &&
      this.postData.password &&
      email.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {
      this.loading.presentLoading();
      this.authService.login(this.postData).subscribe(
        (res: any) => {
          if (res.email) {
            // Storing the User data.
            this.storageService.store(AuthConstants.TOKEN, res.authenticationToken);
            this.storageService.store(AuthConstants.AUTH, res);
            this.storageService.store(AuthConstants.User.email, res.email);
            this.router.navigate(['home/feed']);
          } else {
            this.loading.dismissLoading();
            this.toastService.presentToast('Incorrect email or password.');
          }
        },
        (error: any) => {
          this.loading.dismissLoading();
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter email and password.'
      );
    }
  }

  linkedInLogin() {
    this.linkedin.linkedInLogin();
  }

}