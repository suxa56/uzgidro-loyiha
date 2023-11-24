import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private siteUrl: string = 'https://3705-185-213-229-66.ngrok-free.app/api/'
  private loginUrl: string = 'login/'
  private profile: string = 'profile/'
  private categories: string = 'designer/categories/'

  constructor(private http: HttpClient) {
  }

  loginByAuth({username, password}) {
    return this.http.post(this.siteUrl + this.loginUrl, {username: username, password: password})
  }

  getCategories(token: string) {
    console.log(token)
    const options = this.setHeader(token)
    return this.http.get(this.siteUrl + this.categories, {headers: options})
  }

  getProfile(userId: number, token: string) {
    console.log(token)
    const options = this.setHeader(token)
    return this.http.get(this.siteUrl + this.profile + userId + '/', {headers: options})
  }

  private setHeader(token: string) {
    return  new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
