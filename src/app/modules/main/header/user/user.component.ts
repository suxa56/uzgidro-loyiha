import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {User, UserResponse} from "@/store/state";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User = undefined;

  constructor(private appService: AppService) {
  }

  role: string

  ngOnInit() {
    this.appService.getProfile().subscribe({
      next: (response: UserResponse) => {
        this.user = response.data
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
      },
      complete: () => {
      }
    })
    this.role = this.appService.role
  }

  logout() {
    this.appService.logout();
  }
}
