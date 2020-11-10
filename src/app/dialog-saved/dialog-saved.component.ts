import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogGistComponent } from '../dialog-gist/dialog-gist.component';
import { DialogUserprofileComponent } from '../dialog-userprofile/dialog-userprofile.component';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-dialog-saved',
  templateUrl: './dialog-saved.component.html',
  styleUrls: ['./dialog-saved.component.css']
})
export class DialogSavedComponent implements OnInit {
  likedGists=[];
  gists=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogGistComponent>,
    public postData:PostsService,
    public dialog:MatDialog 
    ) 
    {
      this.likedGists=this.data;
      for(var i=0;i<this.likedGists.length;i++){
        var filesList = [];
        var files = [];
        files=this.likedGists[i].files;
        for(let o in files){
          var file = {
            filename : o
          }
          filesList.push(file);
        }
        if(filesList.length>=4){
          var shortFilesList = filesList.slice(0,3);
          var file1 = {
            filename : "..."
          }
          shortFilesList.push(file1);
        }else{
          shortFilesList = filesList;
        }
        if(this.likedGists[i].description==null||this.likedGists[i].description==''){
          var desc = "Gist by: ".concat(this.likedGists[i].owner.login);
        }else{
          desc = this.likedGists[i].description;
        }

        var object = {
          id: this.likedGists[i].id,
          userUrl: this.likedGists[i].owner.url,
          login: this.likedGists[i].owner.login,
          url: this.likedGists[i].url,
          noOffiles : filesList.length,
          files : shortFilesList,
          description : desc, 
          avatarurl : this.likedGists[i].owner.avatar_url
        }
        this.gists.push(object);
        
      }
    }

  ngOnInit(): void {

  }
  removeGist(url:string){
    this.likedGists = JSON.parse(localStorage.getItem("likedGists"));
    for(var j=0;j<this.likedGists.length;j++){
      if(this.likedGists[j].url==url){
        this.likedGists.splice(j,1);
      }
    }
    localStorage.setItem("likedGists", JSON.stringify(this.likedGists));
    location.reload();
  }
  openGistDialog(url:string){
    this.postData.getPostUrl(url).subscribe((result)=>{
      var thisGist = result;
      const dialogConfig = new MatDialogConfig;
      dialogConfig.autoFocus = false;
      dialogConfig.data = thisGist;
      dialogConfig.width = '460px';
      dialogConfig.height = '400px';
      dialogConfig.disableClose = true;
      this.dialog.open(DialogGistComponent, dialogConfig);  
    });      
  }
  openUserDialog(url:string){
    this.postData.getPostUrl(url).subscribe((result)=>{
      var userDetails=Object.assign([], result);  
      const dialogConfig = new MatDialogConfig;
      dialogConfig.autoFocus = false;
      dialogConfig.data = userDetails;
      dialogConfig.width = '600px';
      dialogConfig.height = '600px';
      this.dialog.open(DialogUserprofileComponent, dialogConfig);    
    });
  }
}
