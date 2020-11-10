import { ThrowStmt } from '@angular/compiler';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogGistComponent } from './dialog-gist/dialog-gist.component';
import { DialogSavedComponent } from './dialog-saved/dialog-saved.component';
import { DialogUserprofileComponent } from './dialog-userprofile/dialog-userprofile.component';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gists=[];
  apiResult=[];
  apiResultUrl=[];
  likedGists=[];

  constructor(
    public postData:PostsService,
    public dialog:MatDialog
    )
  {
    this.getApiResponse();
    

  } 
  title = 'gistable';
  ngOnInit(){
  }
  saveGist(url:string){
    var existFlag=false;
    this.likedGists = JSON.parse(localStorage.getItem("likedGists"));
    if(this.likedGists==null){
      this.likedGists=[];
    }
    for(var i=0;i<this.apiResult.length;i++){
      if(this.apiResult[i].url==url){
        var g = this.apiResult[i];
      }
    }
    for(var j=0;j<this.likedGists.length;j++){
      if(this.likedGists[j].url==url){
        existFlag=true;
      }
    }
    if(!existFlag){
      this.likedGists.push(g);
    }
    localStorage.setItem("likedGists", JSON.stringify(this.likedGists));
  }
  getApiResponse() {
    this.postData.getPosts().subscribe((result)=>{
      this.apiResult=Object.assign([], result);  
      for(var i=0;i<this.apiResult.length;i++){
        var filesList = [];
        var files = [];
        files=this.apiResult[i].files;
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
        if(this.apiResult[i].description==null||this.apiResult[i].description==''){
          var desc = "Gist by: ".concat(this.apiResult[i].owner.login);
        }else{
          desc = this.apiResult[i].description;
        }

        var object = {
          id: this.apiResult[i].id,
          userUrl: this.apiResult[i].owner.url,
          login: this.apiResult[i].owner.login,
          url: this.apiResult[i].url,
          noOffiles : filesList.length,
          files : shortFilesList,
          description : desc, 
          avatarurl : this.apiResult[i].owner.avatar_url
        }
        this.gists.push(object);
        
      }
    })
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
  openSavedGistsDialog(){
    this.likedGists = JSON.parse(localStorage.getItem("likedGists"));
    const dialogConfig = new MatDialogConfig;
      dialogConfig.autoFocus = false;
      dialogConfig.data = this.likedGists;
      dialogConfig.width = '600px';
      dialogConfig.height = '600px';
      this.dialog.open(DialogSavedComponent, dialogConfig); 
  }
}
