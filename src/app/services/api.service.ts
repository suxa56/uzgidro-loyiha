import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private siteUrl: string = 'https://8464-94-158-60-58.ngrok-free.app/'
  private loginUrl: string = 'api/login/'

  constructor(private http: HttpClient) {
  }

  loginByAuth({email, password}) {
    return  this.http.post(this.siteUrl + this.loginUrl, {username: email, password: password})
  }
}
