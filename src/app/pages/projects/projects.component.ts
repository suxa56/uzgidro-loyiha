import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "@services/app.service";
import {
  DirectorProjectsDto,
  DirectorProjectsResponse,
  ProjectsDto,
  ProjectsResponse,
  Role,
  SupervisorProjectsDto,
  SupervisorProjectsResponse
} from "@/store/state";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: ProjectsDto[]
  supervisorProjects: SupervisorProjectsDto[]
  directorProjects: DirectorProjectsDto[]
  role: string

  protected readonly Role = Role;

  constructor(private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    this.role = this.appService.role
    this.getData()
  }

  updateTable(update: boolean) {
    if (update) {
      this.getData()
    }
  }

  private getData() {
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
      } else if (this.router.url === '/unchecked') {
        this.appService.getSupervisorProjects().subscribe({
          next: (response: SupervisorProjectsResponse[]) => {
            this.supervisorProjects = response.filter(item => !item.is_redirect_designer && !item.is_active_designer).map(project => {
              return this.mapSupervisorResponseToDto(project)
            })
          }
        })
      } else {
        this.appService.getSupervisorProjects().subscribe({
          next: (response: SupervisorProjectsResponse[]) => {
            this.setSupervisorProjects(response)
          }
        })
      }
    } else if (this.role === Role.DESIGNER) {
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
      } else if (this.router.url === '/unchecked') {
        this.appService.getProjects().subscribe({
          next: (response: ProjectsResponse[]) => {
            this.projects = response.filter(item => !item.is_redirect_designer && !item.is_active_designer).map(project => {
              return this.mapResponseToDto(project)
            });
          }
        })
      } else {
        this.appService.getProjects().subscribe({
          next: (response: ProjectsResponse[]) => {
            this.setProjects(response)
          }
        })
      }
    } else if (this.role === Role.DIRECTOR) {
      if (this.router.url === '/rejected') {
        this.appService.getDirectorRejectedProjects().subscribe({
          next: (response: DirectorProjectsResponse[]) => {
            this.setDirectorProjects(response)
          }
        })
      } else if (this.router.url === '/approved') {
        this.appService.getDirectorAcceptedProjects().subscribe({
          next: (response: DirectorProjectsResponse[]) => {
            this.setDirectorProjects(response)
          }
        })
      } else if (this.router.url === '/unchecked') {
        this.appService.getDirectorUncheckedProjects().subscribe({
          next: (response: DirectorProjectsResponse[]) => {
            this.setDirectorProjects(response)
          }
        })
      } else {
        this.appService.getDirectorProjects().subscribe({
          next: (response: DirectorProjectsResponse[]) => {
            this.setDirectorProjects(response)
          }
        })
      }
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

  private setDirectorProjects(response: DirectorProjectsResponse[]) {
    this.directorProjects = response.map(value => {
      return this.mapDirectorResponseToDto(value)
    })
  }

  private mapResponseToDto(project: ProjectsResponse) {
    const accepted = (!project.is_redirect_designer && !project.is_active_designer)
      ? null : (project.is_active_designer && !project.is_redirect_designer)
    const dto: ProjectsDto = {
      id: project.id,
      graphicNumber: project.graphic_number,
      archiveNumber: project.arxiv_number,
      workingProjectName: project.working_project_name,
      createdAt: new Date(project.created_add),
      updatedAt: new Date(project.updated_at),
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
      createdAt: new Date(project.created_add),
      updatedAt: new Date(project.updated_at),
      isAccepted: accepted
    }
    return dto
  }

  private mapDirectorResponseToDto(project: DirectorProjectsResponse) {
    const dto: DirectorProjectsDto = {
      id: project.id,
      archiveNumber: project.arxiv_number,
      graphicNumber: project.graphic_number,
      fileCode: project.project_files.file_code,
      subject: project.subject,
      username: project.project_files.user.username,
      workingProjectName: project.working_project_name,
      isAccepted: (!project.is_director_accept && !project.is_director_reject)
        ? null : (project.is_director_accept && !project.is_director_reject),
      createdAt: new Date(project.created_add),
      updatedAt: new Date(project.updated_at)
    }
    return dto
  }

}
