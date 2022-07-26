import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: { id:string }
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }

  deleteQuestion(): void {
    this.storeService.deleteQuestion(this.data.id);
  }
}
