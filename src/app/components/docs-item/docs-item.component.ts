import {Component, Input} from '@angular/core';
import {ProjectFilesResponse} from "@/store/state";
import {AppService} from "@services/app.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentModalComponent} from "@components/comment-modal/comment-modal.component";
import {DownloadFilesComponent} from "@components/download-files/download-files.component";

@Component({
  selector: 'app-docs-item',
  templateUrl: './docs-item.component.html',
  styleUrls: ['./docs-item.component.scss']
})
export class DocsItemComponent {
  @Input() docs: ProjectFilesResponse[] = null

  constructor(private appService: AppService, private dialog: MatDialog) {
  }

  showDetails(doc: ProjectFilesResponse) {
    const dialog = this.dialog.open(DownloadFilesComponent, {
      width: '50%',
      data: doc
    })
  }
}
