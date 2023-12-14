import {Component, Input} from '@angular/core';
import {ProjectsDto, SupervisorProjectsDto, SupervisorProjectsResponse} from "@/store/state";

@Component({
  selector: 'app-supervisor-project-items',
  templateUrl: './supervisor-project-items.component.html',
  styleUrls: ['./supervisor-project-items.component.scss']
})
export class SupervisorProjectItemsComponent {
  @Input() projects: SupervisorProjectsDto[]
}
