import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController) { }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processing...',
      animated:true,
      spinner:'crescent'      
    });
    await loading.present();
  }
  dismissLoading() {
    this.loadingController.dismiss();
  }
}
