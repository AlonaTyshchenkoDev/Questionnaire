import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 3000
  }

  constructor(private matSnackBar: MatSnackBar) {
  }

  onSuccess(message: string): void {
    this.matSnackBar.open(message, 'Close', {
      panelClass: 'success-snackbar',
      ...this.snackBarConfig
    });
  }

  onError(message: string): void {
    this.matSnackBar.open(message, 'Close', {
      panelClass: 'error-snackbar',
      ...this.snackBarConfig
    });
  }

  onWarning(message: string): void {
    this.matSnackBar.open(message, 'Close', {
      panelClass: 'warning-snackbar',
      ...this.snackBarConfig
    });
  }
}
