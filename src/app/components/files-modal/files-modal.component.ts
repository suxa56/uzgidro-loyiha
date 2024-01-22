import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsDto} from "@/store/state";
import {ToastrService} from "ngx-toastr";
import {AppService} from "@services/app.service";

@Component({
  selector: 'app-files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.scss']
})
export class FilesModalComponent implements OnInit {
  files: { category: string, file: File }[] = []
  fileForm: FormGroup
  comment: string
  rejectedBy: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProjectsDto,
              private appService: AppService,
              private toastr: ToastrService,
              private dialogRef: MatDialogRef<FilesModalComponent>) {
  }

  ngOnInit() {
    this.appService.getRejectedComment(this.data.id).subscribe({
      next: value => {
        this.comment = value.data.comment
        this.rejectedBy = value.data.user.username
      }
    })

    this.fileForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      projectPdf: new FormControl(null, Validators.required),
      projectAutocad: new FormControl(null, Validators.required),
      estimatePdf: new FormControl(null, Validators.required),
      estimateExcel: new FormControl(null, Validators.required)
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

  submitProject() {
    if (this.fileForm.valid) {
      this.appService.changeProject(this.data.id, this.fileForm.get('subject').value, this.files).subscribe({
        next: () => {
          this.toastr.success('', 'Loyiha jonatildi')
          this.dialogRef.close()
        },
        error: () => {
          this.toastr.error('', 'Loyiha jonatilmadi')
        }
      })
    } else {
      this.toastr.warning('', 'Loyiha notog\'ri kiritilgan')
    }
  }
}
