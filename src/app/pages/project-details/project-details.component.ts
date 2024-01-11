import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "@services/app.service";
import {ProjectDetailDto, ProjectDetailResponse} from "@/store/state";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {CommentModalComponent} from "@components/comment-modal/comment-modal.component";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  projectId: number
  project: ProjectDetailDto
  comment: string

  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router, private appService: AppService, private dialog: MatDialog) {
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

  openDialog(approve: boolean) {
    const dialog = this.dialog.open(CommentModalComponent, {
      width: '50%',
      data: {id: this.projectId, comment: this.comment, approve: approve}
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        if (approve) {
          this.acceptProject(result)
        } else {
          this.rejectProject(result)
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

  private acceptProject(comment: string) {
    this.appService.acceptProject(this.projectId, comment).subscribe({
      next: () => {
        this.toastr.success('', 'Loyiha qabul qilindi')
        this.router.navigate(['/projects'])
      }
    })
  }

  private rejectProject(comment: string) {
    this.appService.rejectProject(this.projectId, comment).subscribe({
      next: () => {
        this.toastr.warning('', 'Loyiha rad etilgan')
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

  protected readonly open = open;
}
