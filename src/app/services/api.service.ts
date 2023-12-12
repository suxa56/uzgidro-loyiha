import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import FormData from "form-data";

const SITE = 'https://4-sqd.uz/api/'
const LOGIN = 'login/'
const PROFILE = 'profile/'
const CATEGORIES = 'designer/categories/'
const CREATE_DOCS = 'designer/project-file-create/'

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
    return this.http.get(SITE + CATEGORIES, options)
  }

  getProfile(userId: number, token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + PROFILE + userId + '/', options)
  }

  updateProfile(firstName: string, lastName: string, email: string, phone: number, userId: string, token: string) {
    const options = this.setHeader(token)
    return this.http.patch(SITE + PROFILE + userId + '/', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    }, options)
  }

  createDocs(formData: FormData, token: string) {
    const options = this.setFileHeader(token)
    return this.http.post(SITE + CREATE_DOCS, formData, options)
  }

  private setFileHeader(token: string) {
    return {headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })};
  }

  private setHeader(token: string) {
    return {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })};
  }
}
