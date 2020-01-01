import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Platform } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})
export class FeedPage implements OnInit {
  public authUser: any;
  constructor(private auth: AuthService, private platform: Platform,
    private notiService: NotificationsService, private loading:LoadingService) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      this.loading.dismissLoading();
      if (this.platform.is('cordova')) {
        this.notiService.setupPush(res.email);
      }
    });
  }
}