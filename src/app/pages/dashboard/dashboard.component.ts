import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {ProjectsResponse, Role} from "@/store/state";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allProjects: number
  uncheckedProjects: number
  approvedProjects: number
  rejectedProjects: number

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    if (this.appService.role == Role.DESIGNER) {
      this.appService.getProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.allProjects = response.length
          this.uncheckedProjects = response.filter(item => !item.is_redirect_designer && !item.is_active_designer).length
        }
      })
      this.appService.getApprovedProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.approvedProjects = response.length
        }
      })
      this.appService.getRejectedProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.rejectedProjects = response.length
        }
      })
    } else if (this.appService.role == Role.SUPERVISOR) {
      this.appService.getSupervisorProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.allProjects = response.length
          this.uncheckedProjects = response.filter(item => !item.is_redirect_designer && !item.is_active_designer).length
        }
      })
      this.appService.getSupervisorResultProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.allProjects = response.length
        }
      })
      this.appService.getSupervisorAcceptedProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.approvedProjects = response.length
        }
      })
      this.appService.getSupervisorRejectedProjects().subscribe({
        next: (response: ProjectsResponse[]) => {
          this.rejectedProjects = response.length
        }
      })
    }
  }
}
