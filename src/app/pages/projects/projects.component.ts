import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "@services/app.service";
import {ProjectsDto, ProjectsResponse, Role, SupervisorProjectsDto, SupervisorProjectsResponse} from "@/store/state";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: ProjectsDto[]
  supervisorProjects: SupervisorProjectsDto[]
  role: string

  protected readonly Role = Role;

  constructor(private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    this.role = this.appService.role

    if (this.role === Role.SUPERVISOR) {

      if (this.router.url === '/rejected') {
        this.appService.getSupervisorRejectedProjects().subscribe({
          next: (response: SupervisorProjectsResponse[]) => {
            this.setSupervisorProjects(response, false)
          }
        })
      } else if (this.router.url === '/approved') {
        this.appService.getSupervisorAcceptedProjects().subscribe({
          next: (response: SupervisorProjectsResponse[]) => {
            this.setSupervisorProjects(response, true)
          }
        })
      } else {
        this.appService.getSupervisorProjects().subscribe({
          next: (response: SupervisorProjectsResponse[]) => {
            this.setSupervisorProjects(response)
          }
        })
      }
    }

    if (this.router.url === '/rejected') {
      this.appService.getRejectedProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.setProjects(response)
        }
      })
    } else if (this.router.url === '/approved') {
      this.appService.getApprovedProjects().subscribe({
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

  private setSupervisorProjects(response: SupervisorProjectsResponse[], isAccepted?: boolean) {
    this.supervisorProjects = response.map(project => {
      return this.mapSupervisorResponseToDto(project, isAccepted)
    })
  }

  private mapResponseToDto(project: ProjectsResponse) {
    const accepted = (!project.is_redirect_designer && !project.is_active_designer)
      ? null : (project.is_active_designer && !project.is_redirect_designer)
    const dto: ProjectsDto = {
      graphicNumber: project.graphic_number,
      archiveNumber: project.arxiv_number,
      workingProjectName: project.working_project_name,
      createdAt: new Date(project.created_add),
      isAccepted: accepted
    }
    return dto
  }

  private mapSupervisorResponseToDto(project: SupervisorProjectsResponse, isAccepted?: boolean) {
    let accepted: boolean
    if (isAccepted !== undefined) {
      accepted = isAccepted
    } else {
      accepted = (!project.is_redirect_designer && !project.is_active_designer)
        ? null : (project.is_active_designer && !project.is_redirect_designer)
    }
    const fileCode = project.project_files ? project.project_files.file_code : ''
    const dto: SupervisorProjectsDto = {
      id: project.id,
      archiveNumber: project.arxiv_number,
      workingProjectName: project.working_project_name,
      fileCode: fileCode,
      username: project.user.username,
      sectionName: project.user.section_name,
      graphicNumber: project.graphic_number,
      createdAt: project.created_add,
      isAccepted: accepted
    }
    return dto
  }

}
