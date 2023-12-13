import {Component, Input} from '@angular/core';
import {ProjectsDto} from "@/store/state";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {
  @Input() projects: ProjectsDto[]
}
