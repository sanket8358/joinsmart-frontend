import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
declare var cordova: any;
@Injectable({
  providedIn: 'root'
})
export class LinkedInService {

  constructor(private loading:LoadingService, private http: HttpService, private platform: Platform, private toast: ToastService, private router:Router, private storageService: StorageService) { }
  linkedInLogin() {
    this.platform.ready().then(() => {
      this.loginInBrowser().then(success => {
        this.loading.presentLoading();
        let headers = {
          'Content-Type': 'application/json'
        };
        var code = { 'code': success.code };
        this.http.postForLinkedin("api/auth/getaccesstoken", code, headers)
          .subscribe((res: any) => {
            if (res !== undefined) {
              this.storageService.store(AuthConstants.TOKEN,res);
              this.getLinkedInUserDetails(res.toString()).subscribe((res: any) => {
                this.storageService.store(AuthConstants.AUTH,res);
                this.router.navigate(['home/feed']);
              },
                (error: any) => {
                  this.loading.dismissLoading();
                  this.toast.presentToast(JSON.stringify(error));
                });
            } else {
            }
          }, (err: any) => {
            this.loading.dismissLoading();
            this.toast.presentToast(JSON.stringify(err));
          });
      }, (error) => {
        this.loading.dismissLoading();
        this.toast.presentToast(JSON.stringify(error));
      });
    });
  }
  loginInBrowser(): Promise<any> {
    return new Promise(function (resolve, reject) {
      var uri = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81sirvv927wpon&" + "redirect_uri=https://joinsmart.herokuapp.com/api/auth/callback&scope=r_emailaddress%20r_liteprofile";
      var browserRef = cordova.InAppBrowser.open(uri);

      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf('joinsmart.herokuapp.com/api/auth/callback') >= 0) {
          browserRef.removeEventListener("exit", (event) => { });
          browserRef.close();
          var parsedResponse = {};
          var code = (event.url.split("=")[1]).split("&")[0];
          var state = event.url.split("=")[2];
          if (code !== undefined && state !== null) {
            parsedResponse["code"] = code;
            resolve(parsedResponse);
          } else {
            reject({ 'status': 'failed' });
          }
        }
      });
      browserRef.addEventListener("exit", function (event) {
        this.loading.dismissLoading();
        reject("The LinkedIn sign in flow was canceled");
      });
    });
  }

  getLinkedInUserDetails(token: string) {
    let headers = {
      'Content-Type': 'application/json'
    };
    return this.http.postForLinkedin("api/auth/getuserprofile", { 'token': token }, headers);
  }
}
