import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {ConclusionDto, ConclusionResponse} from "@/store/state";

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss']
})
export class ConclusionComponent implements OnInit{
  conclusions?: ConclusionDto[]

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getConclusions().subscribe({
      next: (response: ConclusionResponse[]) => {
        console.log(response)
        this.conclusions = response.map(value => {
          return this.mapResponseToDto(value)
          }
        )
      }
    })
  }

  private mapResponseToDto(response: ConclusionResponse) {
    const dto : ConclusionDto = {
      id: response.id,
      archiveNumber: response.all_file.arxiv_number,
      graphicNumber: response.all_file.graphic_number,
      createdAt: new Date(response.created_add),
      comment: response.comment,
      fileCode: response.all_file.project_files.file_code,
      user: response.user.username
    }
    return dto
  }

}
