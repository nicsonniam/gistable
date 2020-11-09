import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogGistComponent } from './dialog-gist/dialog-gist.component';
import { DialogUserprofileComponent } from './dialog-userprofile/dialog-userprofile.component';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //subscriptions: Subscription[] = [];
  gists=[];
  //files=[];
  apiResult=[];
  apiResultUrl=[];
  //filesList=[];

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
  getApiResponse() {
    this.postData.getPosts().subscribe((result)=>{
      this.apiResult=Object.assign([], result);
      console.log(this.apiResult);      
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

        var object = {
          id: this.apiResult[i].id,
          userUrl: this.apiResult[i].owner.url,
          url: this.apiResult[i].url,
          noOffiles : filesList.length,
          files : shortFilesList,
          description : this.apiResult[i].description, 
          avatarurl : this.apiResult[i].owner.avatar_url
        }
        this.gists.push(object);
        
      }
    })
  }
/*   getApiResponseUrl(url:string) {
    this.postData.getPostUrl(url).subscribe((result)=>{
      this.apiResultUrl=Object.assign([], result);      
    });
  } */
  openUserDialog(url:string){
    this.postData.getPostUrl(url).subscribe((result)=>{
      var userDetails=Object.assign([], result);  
      const dialogConfig = new MatDialogConfig;
      dialogConfig.autoFocus = true;
      dialogConfig.data = userDetails;
      dialogConfig.width = '600px';
      dialogConfig.height = '600px';
      this.dialog.open(DialogUserprofileComponent, dialogConfig);    
    });
  }
  openGistDialog(url:string){
    for(var i=0; i<this.apiResult.length; i++){
      if(this.apiResult[i].url == url){
        var thisGist = this.apiResult[i]
      }
    }
    const dialogConfig = new MatDialogConfig;
      dialogConfig.autoFocus = true;
      dialogConfig.data = thisGist;
      dialogConfig.width = '600px';
      dialogConfig.height = '600px';
      this.dialog.open(DialogGistComponent, dialogConfig);  
  }
}
