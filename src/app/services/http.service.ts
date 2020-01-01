import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any, reqHeaders:any) {
    const headers = new HttpHeaders(reqHeaders);
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, JSON.stringify(data), options);
  }

  postExternal(serviceName: string, data: any, reqHeaders:any) {
    const headers = new HttpHeaders(reqHeaders);
    const options = { headers: headers, withCredintials: false };
    const url =  serviceName;
    return this.http.post(url, JSON.stringify(data), options);
  }

  postForLinkedin(serviceName: string, data: any, reqHeaders:any) {
    const headers = new HttpHeaders(reqHeaders);
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, data, options);
  }

  get(serviceName: string, reqHeaders:any) {
    const headers = new HttpHeaders(reqHeaders);
    const options = { headers: headers, withCredintials: false };
    const url =  environment.apiUrl +serviceName;
    return this.http.get(url, options);
  }

  getExternal(serviceName: string, reqHeaders:any) {
    const headers = new HttpHeaders(reqHeaders);
    const options = { headers: headers };
    const url =  serviceName;
    return this.http.get(url, options);
  }
}