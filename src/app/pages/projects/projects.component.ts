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
      return;
    }
    if (this.router.url === '/approved') {
      return;
    }

    this.appService.getProjects().subscribe({
      next: (response: ProjectsResponse[]) => {
        this.projects = response.map(project => {
          const accepted = (!project.is_redirect_designer && !project.is_active_designer)
            ? null : !(!project.is_active_designer && project.is_redirect_designer)

          return {
            graphicNumber: project.graphic_number,
            archiveNumber: project.arxiv_number,
            workingProjectName: project.working_project_name,
            createdAt: new Date(project.created_add),
            isAccepted: accepted,
          }
        })
      },
      complete: () => {
      }
    })
  }

}
