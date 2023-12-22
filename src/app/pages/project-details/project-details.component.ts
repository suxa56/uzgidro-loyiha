import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "@services/app.service";
import {ProjectDetailDto, ProjectDetailResponse} from "@/store/state";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  projectId: number
  project: ProjectDetailDto

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params['id']
    })
    this.appService.getSupervisorProjectById(this.projectId).subscribe({
      next: (response: ProjectDetailResponse) => {
        const project = response.data
        this.project = {
          id: project.id,
          archiveNumber: project.arxiv_number ? project.arxiv_number : '',
          graphicNumber: project.graphic_number ? project.graphic_number : '',
          workingProjectName: project.working_project_name ? project.working_project_name : '',
          fileCode: project.project_files && project.project_files.file_code ? project.project_files.file_code : '',
          username: project.user.username ? project.user.username : '',
          sectionName: project.user.section_name ? project.user.section_name : '',
          subject: project.subject ? project.subject : '',
          projectPdf: project.file_pdf,
          projectAutocad: project.file_autocad,
          estimateExcel: project.simeta_autocad,
          estimatePdf: project.simeta_pdf,
          createdAt: project.created_add ? project.created_add : ''
        }
      }
    })
  }

  download(type: string) {
    this.appService.downloadFiles(type, this.projectId).subscribe({
      next: value => {
        const blob = new Blob([value], {type: value.type}); // Создание Blob из полученных данных
        const fileURL = URL.createObjectURL(blob);
        const extension = this.getFileExtension(value.type)

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `${this.project.graphicNumber}-${type}.${extension}`;
        link.click();
        URL.revokeObjectURL(fileURL);
      }
    })
  }

  acceptProject() {
    this.appService.acceptProject(this.projectId).subscribe({
      next: () => {
        this.router.navigate(['/projects'])
      }
    })
  }

  rejectProject() {
    this.appService.rejectProject(this.projectId).subscribe({
      next: () => {
        this.router.navigate(['/projects'])
      }
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
