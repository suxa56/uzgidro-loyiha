import {Component, Input} from '@angular/core';
import {ProjectFilesResponse} from "@/store/state";
import {AppService} from "@services/app.service";

@Component({
  selector: 'app-docs-item',
  templateUrl: './docs-item.component.html',
  styleUrls: ['./docs-item.component.scss']
})
export class DocsItemComponent {
  @Input() docs: ProjectFilesResponse[] = null

  constructor(private appService: AppService) {
  }

  download(project: ProjectFilesResponse, type: string) {
    this.appService.downloadDocs(type, project.id).subscribe({
      next: value => {
        const blob = new Blob([value], {type: value.type}); // Создание Blob из полученных данных
        const fileURL = URL.createObjectURL(blob);
        const extension = this.getFileExtension(value.type)

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `${project.file_code}-${type}.${extension}`;
        link.click();
        URL.revokeObjectURL(fileURL);
      },
      error: err => console.log(err)
    })
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
