import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from "@services/api.service";
import {CookieOptions, CookieService} from "ngx-cookie-service";
import {AuthResponse, Role} from "@/store/state";
import * as jwtDecode from 'jwt-decode';
import {catchError} from "rxjs";
import FormData from "form-data";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _token = this.cookie.get('jwt')
  private _role = this.cookie.get('role')

  get token(): string {
    if (this.isTokenValid()) {
      return this._token
    }
  }

  get role(): string {
    return this._role;
  }

  set token(jwt: string) {
    this._token = jwt;
  }

  set role(value: string) {
    this._role = value;
  }

  constructor(private router: Router, private toastr: ToastrService, private apiService: ApiService, private cookie: CookieService) {
  }

  getSectionName() {
    return this.apiService.getSectionName(jwtDecode.jwtDecode(this.token)['user_id'], this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при запросе данных')
        return [];
      })
    )
  }

  getCategories() {
    return this.apiService.getCategories(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при получении данных')
        return [];
      })
    )
  }

  loginByAuth({username, password}) {
    try {
      this.apiService.loginByAuth({username, password}).subscribe({
        next: (response: AuthResponse) => {
          if (response) {
            this.setToken(response)
            this.toastr.success('Login success');
            this.router.navigate(['/'])
          }
        },
        error: error => {
          this.toastr.error(error, 'Ошибка при запросе данных')
        },
        complete: () => {
        }
      })
    } catch (error) {
      this.toastr.error(error.message);
    }
  }

  async registerByAuth({email, password}) {
    // try {
    //   const token = await Gatekeeper.registerByAuth(email, password);
    //   localStorage.setItem('token', token);
    //   await this.getProfile();
    //   this.router.navigate(['/']);
    //   this.toastr.success('Register success');
    // } catch (error) {
    //   this.toastr.error(error.message);
    // }
  }

  updateProfile({firstName, lastName, email, phone}) {
    return this.apiService.updateProfile(firstName, lastName, email, phone.replace(/\D/g, ''), jwtDecode.jwtDecode(this.token)['user_id'], this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getProfile() {
    return this.apiService.getProfile(jwtDecode.jwtDecode(this.token)['user_id'], this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при запросе данных')
        return [];
      })
    )
  }

  getProjectFiles() {
    return this.apiService.getProjectFiles(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при запросе данных')
        return [];
      })
    )
  }

  getSupervisorProjectFiles() {
    return this.apiService.getSupervisorProjectFiles(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при запросе данных')
        return [];
      })
    )
  }

  submitProjectFiles(code: string, categoryId: number, files: Record<string, File>) {
    const formData = new FormData()
    formData.append('categories', categoryId)
    formData.append('file_code', code)
    formData.append('decision_files', files['decision'], files['decision'].name)
    formData.append('calendar_files', files['calendar'], files['calendar'].name)
    formData.append('contract_files', files['contract'], files['contract'].name)
    formData.append('additional_files', files['addition'], files['addition'].name)
    return this.apiService.createProjectFiles(formData, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getProjects() {
    return this.apiService.getProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getConclusions() {
    return this.apiService.getConclusions(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getSupervisorProjects() {
    return this.apiService.getSupervisorProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getSupervisorAcceptedProjects() {
    return this.apiService.getSupervisorAcceptedProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getSupervisorRejectedProjects() {
    return this.apiService.getSupervisorRejectedProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getSupervisorResultProjects() {
    return this.apiService.getSupervisorResultProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getSupervisorProjectById(projectId: number) {
    return this.apiService.getSupervisorProjectById(projectId, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getApprovedProjects() {
    return this.apiService.getApprovedProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getRejectedProjects() {
    return this.apiService.getRejectedProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getDirectorProjects() {
    return this.apiService.getDirectorProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getDirectorAcceptedProjects() {
    return this.apiService.getDirectorApprovedProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getDirectorRejectedProjects() {
    return this.apiService.getDirectorRejectedProjects(this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  downloadFiles(type: string, projectId: number) {
    return this.apiService.downloadFiles(type, projectId, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  downloadDocs(type: string, projectId: number) {
    return this.apiService.downloadDocs(type, projectId, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  submitProject(projectFileId: number, {graphic, archive, worker, subject}, files: Record<string, File>) {
    const formData = new FormData()
    formData.append('project_files', projectFileId)
    formData.append('graphic_number', graphic)
    formData.append('working_project_name', worker)
    formData.append('arxiv_number', archive)
    formData.append('subject', subject)
    formData.append('file_pdf', files['projectPdf'])
    formData.append('file_autocad', files['projectAutocad'])
    formData.append('simeta_pdf', files['estimatePdf'])
    formData.append('simeta_autocad', files['estimateExcel'])
    return this.apiService.createProject(formData, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  getRejectedComment(projectId: number) {
    return this.apiService.getRejectedComment(projectId, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  acceptProject(projectId: number, comment: string) {
    return this.apiService.acceptProject(projectId, comment, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  rejectProject(projectId: number, comment: string) {
    return this.apiService.rejectProject(projectId, comment, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  changeProject(id: number, subject: string, files: Record<string, File>) {
    const formData = new FormData()
    formData.append('subject', subject)
    formData.append('file_pdf', files['projectPdf'])
    formData.append('file_autocad', files['projectAutocad'])
    formData.append('simeta_pdf', files['estimatePdf'])
    formData.append('simeta_autocad', files['estimateExcel'])
    return this.apiService.patchProject(id, formData, this.token).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Ошибка при отправке данных')
        return [];
      })
    )
  }

  isTokenValid() {
    if (this.cookie.check('jwt') && jwtDecode.jwtDecode(this.cookie.get('jwt')).exp * 1000 > new Date().getTime()) {
      return true
    }
    this.logout()
    return false
  }

  logout() {
    this.setToken(null)
    this.router.navigate(['/login']);
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      let token = jwtDecode.jwtDecode(response.access);
      const options: CookieOptions = {
        path: '/',
        sameSite: "Strict",
        secure: true,
        domain: undefined,
        expires: token.exp
      }
      this.cookie.set('role', this.setRole(response), new Date(token.exp * 1000))
      this.cookie.set('jwt', response.access, options)
      this.token = this.cookie.get('jwt')
      this.role = this.cookie.get('role')
    } else {
      this.cookie.deleteAll('/')
    }
  }

  private setRole(response: AuthResponse) {
    let role: Role
    if (response.is_builder) {
      role = Role.BUILDER
    }
    if (response.is_pto) {
      role = Role.PTO
    }
    if (response.is_uzg) {
      role = Role.UZG
    }
    if (response.is_director) {
      role = Role.DIRECTOR
    }
    if (response.is_designer) {
      role = Role.DESIGNER
    }
    if (response.is_supervisor) {
      role = Role.SUPERVISOR
    }
    if (response.is_chief_director) {
      role = Role.CHIEF_DIRECTOR
    }
    if (response.is_chief_supervisor) {
      role = Role.CHIEF_SUPERVISOR
    }
    if (response.is_tex_supervisor) {
      role = Role.TEX_SUPERVISOR
    }
    return role
  }
}
