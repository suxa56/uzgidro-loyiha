import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "@services/app.service";
import {ProjectDetailDto, ProjectDetailResponse} from "@/store/state";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit{

  projectId:number
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
          fileCode: project.project_files.file_code ? project.project_files.file_code : '',
          username: project.user.username ? project.user.username : '',
          sectionName: project.user.section_name ? project.user.section_name : '',
          subject: project.subject ? project.subject : '',
          projectPdf: project.file_pdf ? project.file_pdf : '',
          projectAutocad: project.file_autocad ? project.file_autocad : '',
          estimateExcel: project.simeta_autocad ? project.simeta_autocad : '',
          estimatePdf: project.simeta_pdf ? project.simeta_pdf : '',
          createdAt: project.created_add ? project.created_add : ''
        }
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
}
