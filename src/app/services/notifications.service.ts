import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private oneSignal: OneSignal, 
      private alertCtrl:AlertController) { }

  setupPush(email:string) {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('a800226f-5615-4e7f-9545-9fed8b2b5ee4', email);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    this.oneSignal.getIds().then(id=>{
      
    }).catch(err=>{
      this.showAlert("Error", "Error while getting user Id", "close",undefined);
    });
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task,data);
    });

    // Notification was really clicked/opened 
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert('Notification opened', 'You already read this before', additionalData.task,data);
    });

    this.oneSignal.endInit();
  }
  async showAlert(title, msg, task, data) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'close',
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }
}
