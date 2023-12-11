import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const SITE = 'https://4-sqd.uz/api/'
const LOGIN = 'login/'
const PROFILE = 'profile/'
const CATEGORIES = 'designer/categories/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  loginByAuth({username, password}) {
    return this.http.post(SITE + LOGIN, {username: username, password: password})
  }

  getCategories(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + CATEGORIES, {headers: options})
  }

  getProfile(userId: number, token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + PROFILE + userId + '/', {headers: options})
  }

  updateProfile(firstName: string, lastName: string, email: string, phone: number, userId: string, token: string) {
    const options = this.setHeader(token)
    return this.http.patch(SITE + PROFILE + userId + '/', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    }, {headers: options})
  }

  private setHeader(token: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
