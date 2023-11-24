import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private siteUrl: string = 'https://19f2-185-213-229-66.ngrok-free.app/api/'
  private loginUrl: string = 'login/'
  private profile: string = 'profile/'

  constructor(private http: HttpClient) {
  }

  loginByAuth({username, password}) {
    return this.http.post(this.siteUrl + this.loginUrl, {username: username, password: password})
  }

  getProfile(userId: number, token: string) {
    console.log(userId)
    console.log(token)
    console.log(this.siteUrl + this.profile + userId + '/')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const options = {headers: headers};
    console.log(options)
    return this.http.get(this.siteUrl + this.profile + userId + '/', options)
  }
}
