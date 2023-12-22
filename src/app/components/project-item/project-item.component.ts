import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectsDto} from "@/store/state";
import {FilesModalComponent} from "@components/files-modal/files-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {
  @Input() projects: ProjectsDto[]
  @Output() projectUpdateEvent = new EventEmitter<boolean>

  constructor(private dialog: MatDialog) {
  }

  changeFiles(project: ProjectsDto) {
    const dialog = this.dialog.open(FilesModalComponent, {
      data: project
    })
    dialog.afterClosed().subscribe(() => {
      this.projectUpdateEvent.emit(true)
    })
  }
}
