import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    });
  }
  login(postData: any): Observable<any> {
    return this.httpService.post('api/auth/login', postData, { 'Content-Type': 'application/json' });
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('api/auth/signup', postData, { 'Content-Type': 'application/json' });
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.storageService.removeStorageItem(AuthConstants.TOKEN).then(res => {
        this.router.navigate(['/login']);
      });
    });
  }
}