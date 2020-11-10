import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-gist',
  templateUrl: './dialog-gist.component.html',
  styleUrls: ['./dialog-gist.component.css']
})
export class DialogGistComponent implements OnInit {
  files =[];
  description: string;
  filesList =[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogGistComponent> 
    ) 
  { 
    this.files = Object.assign([], this.data.files);
    if(this.data.description==null||this.data.description==''){
      this.description = "*No Title";
    }else{
      this.description = this.data.description;
    }
  }

  ngOnInit(): void {
    this.getAllFiles();
    console.log(this.data);
  }
  getAllFiles(){
    for(var i = 0; i < Object.keys(this.files).length; i++){
      let s : string = Object.keys(this.files)[i];
      var file = {
        filename: this.files[s].filename,
        type: this.files[s].type,
        language: this.files[s].language,
        url: this.files[s].raw_url,
        size: this.files[s].size
      }
      this.filesList.push(file);
      console.log(this.filesList);
    }
    
  }
  goToLink(url: string){
    window.open(url, "_blank");
  }
}
