import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {ProjectFilesResponse} from "@/store/state";

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit{
  docs: ProjectFilesResponse[]

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getSupervisorProjectFiles().subscribe({
      next: (response: ProjectFilesResponse[]) => {
        this.docs = response
      }
    })
  }

}
