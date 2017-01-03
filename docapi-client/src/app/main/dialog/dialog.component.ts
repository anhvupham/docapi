import { MdDialogRef } from '@angular/material';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'delete-dialog',
  template: `
    <confirm-dialog [text]="msg"></confirm-dialog>
  `,
})
export class DeleteDialog {
  private msg = "Are you sure to delete ?";
  constructor(public dialogRef: MdDialogRef<DeleteDialog>) { }
}

@Component({
  selector: 'logout-dialog',
  template: `
    <confirm-dialog [text]="msg"></confirm-dialog>
  `,
})
export class LogoutDialog {
  private msg = "Are you sure to log out ?";
  constructor(public dialogRef: MdDialogRef<LogoutDialog>) { }
}

@Component({
  selector: 'confirm-dialog',
  template: `
    <div md-dialog-content><h3>{{text}}</h3></div>
    <div md-dialog-actions>
      <button md-raised-button (click)="dialogRef.close(false)">No</button>
      <button md-raised-button (click)="dialogRef.close(true)" color="primary">Yes</button>
    </div>
  `,
})
export class ConfirmDialog {
  @Input() text: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) { }
}