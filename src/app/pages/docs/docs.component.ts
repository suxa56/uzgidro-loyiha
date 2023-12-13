import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {Categories} from "@/store/state";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  isMenuOpen = false;
  categories: Categories[]
  docsForm: FormGroup
  loading = false
  files: Record<string, File> = {}
  selectedCategoryId: number

  constructor(private appService: AppService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.appService.getCategories().subscribe({
      next: (response: Categories[]) => {
        this.categories = response
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

    this.docsForm = new FormGroup({
      category: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
      decision: new FormControl(null, Validators.required),
      calendar: new FormControl(null, Validators.required),
      contract: new FormControl(null, Validators.required),
      addition: new FormControl(null, Validators.required)
    })
  }

  documentOnChange(event: any, category: string) {
    const file:File = event.target.files[0];

    if (file) {
      this.files[category] = file
    }
  }

  sendProjectFiles() {
    if (this.docsForm.valid) {
      this.loading = true
      this.appService.submitProjectFiles(this.docsForm.get('code').value, this.selectedCategoryId, this.files).subscribe({
        next: response => {
          // console.log(response)
          this.toastr.success('', 'Hujjat jonatildi')
        },
        error: _ => {
          this.toastr.error('', 'Hujjat jonatilmadi')
        },
        complete: () => {
          this.loading = false
        }
      })
    } else {
      this.toastr.warning('', 'Hujjat notog\'ri kiritildi')
    }
  }


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectCategory(id: number) {
    let cat = this.categories.find(item => item.id === id)
    this.selectedCategoryId = cat.id
    this.docsForm.get('category').setValue(cat.name)
  }
}
