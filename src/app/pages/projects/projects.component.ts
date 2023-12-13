import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "@services/app.service";
import {ProjectsDto, ProjectsResponse} from "@/store/state";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: ProjectsDto[]

  constructor(private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    if (this.router.url === '/rejected') {
      this.appService.getApprovedProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.setProjects(response)
        }
      })
    } else if (this.router.url === '/approved') {
      this.appService.getRejectedProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.setProjects(response)
        }
      })
    } else {
      this.appService.getProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.setProjects(response)
        }
      })
    }
  }

  private setProjects(response: ProjectsResponse[]) {
    this.projects = response.map(project => {
      return this.mapResponseToDto(project)
    });
  }

  private mapResponseToDto(project: ProjectsResponse) {
    const accepted = (!project.is_redirect_designer && !project.is_active_designer)
      ? null : (!project.is_active_designer && project.is_redirect_designer)
    const dto: ProjectsDto = {
      graphicNumber: project.graphic_number,
      archiveNumber: project.arxiv_number,
      workingProjectName: project.working_project_name,
      createdAt: new Date(project.created_add),
      isAccepted: accepted
    }
    return dto
  }

}
