import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent {
  constructor(private dialogRef: MatDialogRef<CommentModalComponent>,
              @Inject (MAT_DIALOG_DATA) public data: {id: number, approve: boolean, comment: string}) {
  }

  close() {
    this.dialogRef.close()
  }
}
