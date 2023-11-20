import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private siteUrl: string = 'https://1676-94-158-60-181.ngrok-free.app/'
  private loginUrl: string = 'api/login/'
  private logoutUrl: string = 'api/logout/'

  constructor(private http: HttpClient) {
  }

  loginByAuth({username, password}) {
    return this.http.post(this.siteUrl + this.loginUrl, {username: username, password: password})
  }

  logout() {
    return this.http.get(this.siteUrl + this.logoutUrl)
  }
}
