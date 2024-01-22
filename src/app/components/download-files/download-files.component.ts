import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ProjectFilesResponse, ProjectsDto} from "@/store/state";
import {AppService} from "@services/app.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-download-files',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './download-files.component.html',
  styleUrls: ['./download-files.component.scss']
})
export class DownloadFilesComponent implements  OnInit{
  calendar: string[] = []
  additional: string[] = []
  decision: string[] = []
  contract: string[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProjectFilesResponse,
              private appService: AppService,
              private toastr: ToastrService,
              private dialogRef: MatDialogRef<DownloadFilesComponent>) {
  }

  ngOnInit() {
    this.appService.getProjectDetails(this.data.id).subscribe({
      next: (value) => {
        for (let item of value.data) {
          console.log(item)
          if (item.includes('calendar')) {
            this.calendar.push(item)
          } else if (item.includes('decision')) {
            this.decision.push(item)
          } else if (item.includes('contract')) {
            this.contract.push(item)
          } else if (item.includes('additional')) {
            this.additional.push(item)
          }
        }
      }
    })
  }

  download(name: string) {
    this.appService.downloadDocs(name, this.data.id).subscribe({
      next: value => {
        const blob = new Blob([value], {type: value.type}); // Создание Blob из полученных данных
        const fileURL = URL.createObjectURL(blob);
        const extension = this.getFileExtension(value.type)

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `${this.data.file_code}-${name}.${extension}`;
        link.click();
        URL.revokeObjectURL(fileURL);
      },
      error: err => console.log(err)
    })
  }

  close() {
    this.dialogRef.close()
  }

  private getFileExtension(type: string) {
    switch (type) {
      case 'application/vnd.ms-excel': {
        return 'xls'
      }
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        return 'xlsx'
      }
      case 'application/msword': {
        return 'doc'
      }
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        return 'docx'
      }
      case 'application/pdf': {
        return 'pdf'
      }
      case 'application/octet-stream': {
        return 'dwg'
      }
      default: {
        return "pdf"
      }
    }
  }
}
