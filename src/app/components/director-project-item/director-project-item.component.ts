import {Component, Input} from '@angular/core';
import {DirectorProjectsDto} from "@/store/state";

@Component({
  selector: 'app-director-project-item',
  templateUrl: './director-project-item.component.html',
  styleUrls: ['./director-project-item.component.scss']
})
export class DirectorProjectItemComponent {
  @Input() projects: DirectorProjectsDto[]
}
