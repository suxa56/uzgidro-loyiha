import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {Categories} from "@/store/state";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-docs',
  templateUrl: './create-docs.component.html',
  styleUrls: ['./create-docs.component.scss']
})
export class CreateDocsComponent implements OnInit {
  isMenuOpen = false;
  categories: Categories[]
  docsForm: FormGroup
  loading = false
  files: { category: string, file: File }[] = []
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
      calendar: new FormControl(null, Validators.required),
      decision: new FormControl(null),
      decision1: new FormControl(null),
      decision2: new FormControl(null),
      decision3: new FormControl(null),
      contract: new FormControl(null),
      contract1: new FormControl(null),
      contract2: new FormControl(null),
      contract3: new FormControl(null),
      contract4: new FormControl(null),
      contract5: new FormControl(null),
      addition: new FormControl(null)
    })
  }

  documentOnChange(event: any, category: string) {
    const file: File = event.target.files[0];

    if (file) {
      let item = this.files.find(value => value.category === category)
      if (item) {
        item.file = file
      } else {
        this.files.push({category: category, file: file})
      }
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
