import {Component, Input} from '@angular/core';
import {ProjectFilesResponse} from "@/store/state";

@Component({
  selector: 'app-docs-item',
  templateUrl: './docs-item.component.html',
  styleUrls: ['./docs-item.component.scss']
})
export class DocsItemComponent {
  @Input() docs: ProjectFilesResponse[] = null

  download() {

  }
}
