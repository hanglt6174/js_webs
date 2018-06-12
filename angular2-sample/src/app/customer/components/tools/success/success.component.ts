import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html'
})
export class SuccessComponent{

  constructor(public dialogRef: MdDialogRef<SuccessComponent>) { }

}
