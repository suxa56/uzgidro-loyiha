import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private siteUrl: string = 'https://19f2-185-213-229-66.ngrok-free.app/api/'
  private loginUrl: string = 'login/'

  constructor(private http: HttpClient) {
  }

  loginByAuth({username, password}) {
    return this.http.post(this.siteUrl + this.loginUrl, {username: username, password: password})
  }
}
