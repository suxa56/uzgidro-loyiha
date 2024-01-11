import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import FormData from "form-data";

const SITE = 'https://4-sqd.uz/api/'
const LOGIN = 'login/'
const PROFILE = 'profile/'
const CATEGORIES = 'designer/categories/'
const CREATE_PROJECT_FILES = 'designer/project-file-create/'
const GET_PROJECT_FILE_LIST = 'designer/project-file-list/'
const CREATE_PROJECT = 'designer/all-files-create/'
const PATCH_PROJECT = 'designer/patch-file/'
const GET_ALL_PROJECTS = 'designer/all-files/'
const GET_APPROVED_PROJECTS = 'designer/allowed-file/'
const GET_REJECTED_PROJECTS = 'designer/reject-file/'
const GET_SUPERVISOR_PROJECT_FILES = 'designer/control-project-file-all/'
const GET_SUPERVISOR_PROJECTS = 'designer/control-allfiles/'
const GET_SUPERVISOR_PROJECT = 'designer/control-file-detail/'
const GET_SUPERVISOR_ACCEPTED_PROJECT = 'designer/control-accept/'
const GET_SUPERVISOR_REJECTED_PROJECT = 'designer/control-reject/'
const GET_SUPERVISOR_RESULT_PROJECT = 'designer/control-result/'
const GET_SECTION = 'section_name/'
const GET_REJECT_COMMENT = 'designer/reject-file/'
const PATCH_ACCEPT_REJECT_PROJECT = 'designer/control-accept-reject/'

const GET_CONCLUSION = 'designer/summary-file/'

const DOWNLOAD_FILES = 'designer/control-download/'
const DOWNLOAD_DOCS = 'designer/project-download/'


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
    return this.http.get(SITE + GET_SECTION + userId + '/', {headers: options})
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

  createProjectFiles(formData: FormData, token: string) {
    const options = this.setFileHeader(token)
    return this.http.post(SITE + CREATE_PROJECT_FILES, formData, options)
  }

  getProjectFiles(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_PROJECT_FILE_LIST, {headers: options})
  }

  getSupervisorProjectFiles(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_SUPERVISOR_PROJECT_FILES, {headers: options})
  }

  createProject(formData: FormData, token: string) {
    const options = this.setFileHeader(token)
    return this.http.post(SITE + CREATE_PROJECT, formData, options)
  }

  getProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_ALL_PROJECTS, {headers: options})
  }

  getConclusions(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_CONCLUSION, {headers: options})
  }

  getRejectedComment(projectId: number, token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_REJECT_COMMENT + projectId + '/', {headers: options})
  }

  getSupervisorProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_SUPERVISOR_RESULT_PROJECT, {headers: options})
  }

  getSupervisorAcceptedProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_SUPERVISOR_ACCEPTED_PROJECT, {headers: options})
  }

  getSupervisorRejectedProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_SUPERVISOR_REJECTED_PROJECT, {headers: options})
  }

  getSupervisorResultProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_SUPERVISOR_RESULT_PROJECT, {headers: options})
  }

  getSupervisorProjectById(projectId: number, token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_SUPERVISOR_PROJECT + projectId + '/', {headers: options})
  }

  getApprovedProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_APPROVED_PROJECTS, {headers: options})
  }

  getRejectedProjects(token: string) {
    const options = this.setHeader(token)
    return this.http.get(SITE + GET_REJECTED_PROJECTS, {headers: options})
  }

  downloadFiles(type: string, projectId: number, token: string) {
    const params = new HttpParams().append('file-type', type)
    return this.http.get(SITE + DOWNLOAD_FILES + projectId + '/', {
      responseType: 'blob',
      params: params,
      headers: {'Authorization': `Bearer ${token}`}
    })
  }

  downloadDocs(type: string, projectId: number, token: string){
    const params = new HttpParams().append('file-type', type)
    return this.http.get(SITE + DOWNLOAD_DOCS + projectId + '/', {
      responseType: 'blob',
      params: params,
      headers: {'Authorization': `Bearer ${token}`}
    })
  }

  acceptProject(projectId: number, comment: string, token: string) {
    const headers = this.setHeader(token)
    const params = new HttpParams().append('accept', 'accept')
    const options = {headers: headers, params: params}
    return this.http.patch(SITE + PATCH_ACCEPT_REJECT_PROJECT + projectId + '/', {comment: comment}, options)
  }

  rejectProject(projectId: number, comment: string, token: string) {
    const headers = this.setHeader(token)
    const params = new HttpParams().append('reject', 'reject')
    const options = {headers: headers, params: params}
    return this.http.patch(SITE + PATCH_ACCEPT_REJECT_PROJECT + projectId + '/', {comment: comment}, options)
  }

  patchProject(projectId: number, formData: FormData, token: string) {
    const options = this.setFileHeader(token)
    return this.http.patch(SITE + PATCH_PROJECT + projectId + '/', formData, options)
  }

  private setFileHeader(token: string) {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  private setHeader(token: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }
}
