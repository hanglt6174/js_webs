import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  messageString: string;
  constructor(public dialogRef: MdDialogRef<DialogComponent>) { }

  get dialogContent(){
    return this.messageString;
  }
}
