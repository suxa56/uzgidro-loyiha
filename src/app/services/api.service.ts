import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import FormData from "form-data";

const SITE = 'https://4-sqd.uz/api/'
const LOGIN = 'login/'
const PROFILE = 'profile/'
const CATEGORIES = 'designer/categories/'
const CREATE_PROJECT_FILES = 'designer/project-file-create/'
const GET_PROJECT_FILE_LIST = 'designer/project-file-list/'
const CREATE_PROJECT = 'designer/all-files-create/'
const GET_ALL_PROJECTS = 'designer/all-files/'
const GET_APPROVED_PROJECTS = 'designer/allowed-file/'
const GET_REJECTED_PROJECTS = 'designer/reject-file/'
const GET_SECTION = 'section_name/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  loginByAuth({username, password}) {
    return this.http.post(SITE + LOGIN, {username: username, password: password})
  }

  getSectionName(userId: number, token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_SECTION + userId + '/', options)
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

  createProjectFiles(formData: FormData, token: string) {
    const options = this.setFileHeader(token)
    return this.http.post(SITE + CREATE_PROJECT_FILES, formData, options)
  }

  getProjectFiles(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_PROJECT_FILE_LIST, options)
  }

  createProject(formData: FormData, token: string) {
    const options = this.setFileHeader(token)
    return this.http.post(SITE + CREATE_PROJECT, formData, options)
  }

  getProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_ALL_PROJECTS, options)
  }

  getApprovedProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_APPROVED_PROJECTS, options)
  }

  getRejectedProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_REJECTED_PROJECTS, options)
  }

  private setFileHeader(token: string) {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  private setHeader(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
