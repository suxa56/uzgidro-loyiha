import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "@services/app.service";
import {ToastrService} from "ngx-toastr";
import {User, UserResponse} from "@/store/state";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup
  user: User = null
  loading = false

  constructor(private appService: AppService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getProfile()
    this.setupForm()
  }

  formatPhoneNumber(event: any) {
    let value = this.profileForm.get('phone').value
    let formatted: string
    // Удаляем все нецифровые символы из введенного значения
    const cleanedValue = value.replace(/\D/g, '');

    // Форматируем номер телефона (пример: +998 (код оператора) номер-телефона)
    if (cleanedValue.length > 4) {
      formatted = `+998 (${cleanedValue.substring(3, 5)}) ${cleanedValue.substring(5, 8)}-${cleanedValue.substring(8, 10)}-${cleanedValue.substring(10, 12)}`;
    } else if (cleanedValue.length > 0) {
      formatted = `+998 (${cleanedValue}`;
    } else {
      formatted = '+998';
    }

    this.profileForm.get('phone').setValue(formatted)
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.loading = true
      this.appService.updateProfile(this.profileForm.value).subscribe({
        next: _ => {
          this.toastr.success('', 'Profil yangilandi')
          this.getProfile()
        },
        error: _ => {
          this.toastr.error('', 'Profil yangilanmadi')
        },
        complete: () => {
          this.loading = false
        }
      })
    } else {
      this.toastr.error('', 'Profil yangilanmadi')
    }
  }

  private getProfile() {
    this.appService.getProfile().subscribe({
      next: (response: UserResponse) => {
        this.user = response.data
        this.profileForm.setValue({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          phone: response.data.phone
        })
      },
      error: error => {
        console.error('Ошибка:', error);

        // Если есть дополнительная информация об ошибке
        if (error.error instanceof ErrorEvent) {
          // Обработка ошибок на стороне клиента
          console.error('Произошла ошибка:', error.error.message);
        } else {
          ``
          // Обработка ошибок на стороне сервера
          console.error(`Код ошибки ${error.status}, ` + `Текст ошибки: ${error.error}`);
        }
      },
      complete: () => {
      }
    })
  }

  private setupForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.minLength(3), Validators.required]),
      lastName: new FormControl(null, [Validators.minLength(1), Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null, [Validators.minLength(12), Validators.required]),
    })
  }
}
