import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-dialog-gist',
  templateUrl: './dialog-gist.component.html',
  styleUrls: ['./dialog-gist.component.css']
})
export class DialogGistComponent implements OnInit {
  files =[];
  description: string;
  filesList =[];
  asyncTabs: any;
  comments=[];
  commentsNo: any;
  commentsUrl: string;
  noComments: string;
  history=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogGistComponent>,
    public postData:PostsService, 
    ) 
  { 
    this.files = Object.assign([], this.data.files);
    this.history = Object.assign([], this.data.history);
    this.description = this.data.description;
    if(this.description===""){
      this.description = "Gist by: ".concat(this.data.owner.login);
    }
    this.commentsNo=data.comments;
    this.commentsUrl=data.comments_url;
    if(this.commentsNo==0){
      this.comments=[];
      this.noComments='No comments';
    }else{
      this.postData.getPostUrl(this.commentsUrl).subscribe((result)=>{
        this.comments=Object.assign([], result);
        this.noComments='';
      });
    }
  }

  ngOnInit(): void {
    this.getAllFiles();
  }
  closeDialog() {
    this.dialogRef.close();
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
    }
    
  }
  goToLink(url: string){
    window.open(url, "_blank");
  }
}
