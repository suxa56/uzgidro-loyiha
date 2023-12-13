import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {ToastrService} from "ngx-toastr";
import {ProjectFilesResponse} from "@/store/state";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  files: Record<string, File> = {}

  constructor(private appService: AppService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getProjectFiles()
    this.setupForm()
  }

  sendProject() {
    if (this.fileForm.valid) {
      this.loading = true
      this.appService.submitProject(this.projectFileId, this.fileForm.value, this.files).subscribe({
        next: response => {
          // console.log(response)
          this.toastr.success('', 'Loyiha jonatildi')
        },
        error: _ => {
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
      this.files[category] = file
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectCategory(id: number) {
    let cat = this.projectFiles.find(item => item.id === id)
    this.projectFileId = cat.id
    this.fileForm.get('file').setValue(cat.fileCode)
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
