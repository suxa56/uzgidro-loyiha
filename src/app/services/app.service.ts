import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import {ApiService} from "@services/api.service";
import {CookieOptions, CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user: any = null;

  constructor(private router: Router, private toastr: ToastrService, private api: ApiService, private cookie: CookieService) {
  }

  loginByAuth({email, password}) {
    try {
      this.api.loginByAuth({email, password}).subscribe({
        next: (response: {token: string}) => {
          if (response.token) {
                  this.setToken(response.token)
                  this.toastr.success('Login success');
                }
        },
        error: error  => {
            if (error.status === 409) {
              this.logout()
              this.loginByAuth({email, password})
            } else {
              this.toastr.error(error, 'Ошибка при запросе данных')
            }
        },
        complete: () => {}
      })
      // const token = await Gatekeeper.loginByAuth(email, password);
      // localStorage.setItem('token', token);
      // await this.getProfile();
      // this.router.navigate(['/']);
      // this.toastr.success('Login success');
    } catch (error) {
      this.toastr.error(error.message);
    }
  }

  async registerByAuth({email, password}) {
    try {
      const token = await Gatekeeper.registerByAuth(email, password);
      localStorage.setItem('token', token);
      await this.getProfile();
      this.router.navigate(['/']);
      this.toastr.success('Register success');
    } catch (error) {
      this.toastr.error(error.message);
    }
  }

  async getProfile() {
    try {
      this.user = await Gatekeeper.getProfile();
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  logout() {
    this.api.logout()
    this.setToken(null)
    this.user = null;
    this.router.navigate(['/login']);
  }

  private setToken(response: string | null) {
    if (response) {
      const options: CookieOptions = {
        path: '/',
        sameSite: "Strict",
        secure: true,
        domain: undefined,
        expires: new Date(new Date().getTime() + 3600 * 1000)
      }
      this.cookie.set('jwt', response, options)
    } else {
      this.cookie.deleteAll()
    }
  }
}


// message
//   :
//   "Muvaffaqiyatli kirish"
// token
//   :
//   "5ff568889caaa525dde1d1667f012f2230a02b51"
// user
//   :
//   id
//     :
//     1
// is_builder
//   :
//   false
// is_chief_director
//   :
//   false
// is_chief_supervisor
//   :
//   false
// is_designer
//   :
//   false
// is_director
//   :
//   false
// is_supervisor
//   :
//   false
// is_tex_supervisor
//   :
//   false
// username
//   :
//   "admin"
