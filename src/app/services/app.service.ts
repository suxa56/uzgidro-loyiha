import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from "@services/api.service";
import {CookieOptions, CookieService} from "ngx-cookie-service";
import {AuthResponse} from "@/store/state";
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user: number = null;

  constructor(private router: Router, private toastr: ToastrService, private apiService: ApiService, private cookie: CookieService) {
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

  getProfile() {
    let token = this.cookie.get('jwt')
    if (token) {
      this.apiService.getProfile(jwtDecode.jwtDecode(token)['user_id'], token).subscribe({
        next: (response) => {
          console.log(response)
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
  }

  getToken() {
    if (this.cookie.check('jwt')) {
      return jwtDecode.jwtDecode(this.cookie.get('jwt')).exp < new Date().getTime()
    } else {
      this.logout()
      return false
    }
  }

  logout() {
    // this.api.logout()
    this.setToken(null)
    this.user = null;
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
