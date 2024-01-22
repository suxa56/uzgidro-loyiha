import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {ToastrService} from "ngx-toastr";
import {ProjectFilesResponse} from "@/store/state";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit{
  isMenuOpen = false;
  projectFiles: {id: number, name: string, fileCode: string}[] = []
  projectFileId: number
  fileForm: FormGroup
  loading = false
  files: { category: string, file: File }[] = []

  constructor(private appService: AppService, private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    this.getProjectFiles()
    this.setupForm()
  }

  sendProject() {
    if (this.fileForm.valid) {
      this.loading = true
      this.appService.submitProject(this.projectFileId, this.fileForm.value, this.files).subscribe({
        next: () => {
          this.toastr.success('', 'Loyiha jonatildi')
          this.router.navigate(['/projects'])
        },
        error: () => {
          this.toastr.error('', 'Loyiha jonatilmadi')
        },
        complete: () => {
          this.loading = false
        }
      })
    } else {
      this.toastr.warning('', 'Loyiha notog\'ri kiritildi')
    }
  }

  documentOnChange(event: any, category: string) {
    const file:File = event.target.files[0];

    if (file) {
      let item = this.files.find(value => value.category === category)
      if (item) {
        item.file = file
      } else {
        this.files.push({category: category, file: file})
      }
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectCategory(id: number) {
    let cat = this.projectFiles.find(item => item.id === id)
    this.projectFileId = cat.id
    this.fileForm.get('file').setValue(cat.name)
  }


  private getProjectFiles() {
    this.appService.getProjectFiles().subscribe({
      next: (response: ProjectFilesResponse[]) => {
        this.projectFiles = response.map(item => {
          return {
            id: item.id,
            name: item.categories.name,
            fileCode: item.file_code
          }
        }).sort((a, b) => {
          if (a.name === b.name) {
            return a.id - b.id
          }
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
      },
      error: () => {
      },
      complete: () => {
      }
    })
  }
  private setupForm() {
    this.fileForm = new FormGroup({
      file: new FormControl(null, Validators.required),
      graphic: new FormControl(null, Validators.required),
      archive: new FormControl(null, Validators.required),
      worker: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      projectPdf: new FormControl(null, Validators.required),
      projectAutocad: new FormControl(null, Validators.required),
      estimatePdf: new FormControl(null, Validators.required),
      estimateExcel: new FormControl(null, Validators.required)
    })
  }
}
