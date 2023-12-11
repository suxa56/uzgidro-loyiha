import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from "@services/api.service";
import {CookieOptions, CookieService} from "ngx-cookie-service";
import {AuthResponse} from "@/store/state";
import * as jwtDecode from 'jwt-decode';
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  token = this.cookie.get('jwt')

  constructor(private router: Router, private toastr: ToastrService, private apiService: ApiService, private cookie: CookieService) {
  }

  getCategories() {
    this.apiService.getCategories(this.token).subscribe({
      next: response => {
      },
      error: error => {
        console.error('Ошибка:', error);

        // Если есть дополнительная информация об ошибке
        if (error.error instanceof ErrorEvent) {
          // Обработка ошибок на стороне клиента
          console.error('Произошла ошибка:', error.error.message);
        } else {
          // Обработка ошибок на стороне сервера
          console.error(`Код ошибки ${error.status}, ` + `Текст ошибки: ${error.error}`);
        }
        this.toastr.error(error, 'Ошибка при запросе данных')
      },
      complete: () => {
      }
    })
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
    if (this.token) {
      return this.apiService.updateProfile(firstName, lastName, email, phone.replace(/\D/g, ''), jwtDecode.jwtDecode(this.token)['user_id'], this.token).pipe(
        catchError((error) => {
          this.toastr.error(error.message, 'Ошибка при отправке данных')
          return [];
        })
      )
    }
  }

  getProfile() {
    if (this.token) {
      return this.apiService.getProfile(jwtDecode.jwtDecode(this.token)['user_id'], this.token).pipe(
        catchError((error) => {
          this.toastr.error(error.message, 'Ошибка при запросе данных')
          return [];
        })
      )
    }
  }

  isTokenValid() {
    if (this.cookie.check('jwt') && jwtDecode.jwtDecode(this.cookie.get('jwt')).exp < new Date().getTime()) {
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
