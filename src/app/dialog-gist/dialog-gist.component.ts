import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-gist',
  templateUrl: './dialog-gist.component.html',
  styleUrls: ['./dialog-gist.component.css']
})
export class DialogGistComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogGistComponent> 
    ) 
  { 
    console.log(this.data);
  }

  ngOnInit(): void {
  }

}
