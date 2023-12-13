import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from "@services/api.service";
import {CookieOptions, CookieService} from "ngx-cookie-service";
import {AuthResponse} from "@/store/state";
import * as jwtDecode from 'jwt-decode';
import {catchError} from "rxjs";
import FormData from "form-data";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _token = this.cookie.get('jwt')
  get token(): string {
    if (this.isTokenValid()) {
      return this._token
    }
  }

  constructor(private router: Router, private toastr: ToastrService, private apiService: ApiService, private cookie: CookieService) {
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

  submitProject(projectFileId: number, {graphic, archive, worker, subject}, files: Record<string, File>) {
    const formData = new FormData()
    formData.append('subject', projectFileId)
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
      this.cookie.set('jwt', response.access, options)
    } else {
      this.cookie.deleteAll()
    }
  }
}
