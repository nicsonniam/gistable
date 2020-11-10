import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable,Observer } from 'rxjs';
import { DialogGistComponent } from '../dialog-gist/dialog-gist.component';
import { PostsService } from '../posts.service';

export interface ExampleTab {
  label: string;
  content: any[];
}

@Component({
  selector: 'app-dialog-userprofile',
  templateUrl: './dialog-userprofile.component.html',
  styleUrls: ['./dialog-userprofile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogUserprofileComponent implements OnInit {
  asyncTabs: Observable<ExampleTab[]>;
  userDetails=[];
  username: string;
  avatarurl: string;
  htmlurl: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  bio: string;
  twitter: string;
  publicrepos: string;
  publicgists: string;
  followers: string;
  following: string;
  gistsurl: string;
  followingurl: string;
  followersurl: string;
  subscriptionurl: string;
  starredurl: string;
  subscriptions=[];
  starred=[];
  gists=[];
  noGists: string;
  noSubs: string;
  noStar: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogUserprofileComponent>,
    public postData:PostsService, 
    public dialog:MatDialog
    ) 
  {
    this.username = this.data.login;
    this.avatarurl = this.data.avatar_url;
    this.htmlurl = this.data.html_url;
    this.name = this.data.name;
    this.company = this.data.company;
    this.blog = this.data.blog;
    this.location = this.capitalizeFirstLetter(this.data.location);
    this.bio = this.data.bio;
    this.twitter = this.data.twitter_username;
    this.publicrepos = this.data.public_repos;
    this.publicgists = this.data.public_gists;
    this.followers = this.data.followers;
    this.following = this.data.following;
    this.gistsurl = 'https://api.github.com/users/'.concat(this.username,'/gists');
    this.followingurl = 'https://api.github.com/users/'.concat(this.username,'/following');
    this.followersurl = 'https://api.github.com/users/'.concat(this.username,'/followers');
    this.subscriptionurl = this.data.subscriptions_url;
    this.starredurl = 'https://api.github.com/users/'.concat(this.username,'/starred');

    this.postData.getPostUrl(this.gistsurl).subscribe((result)=>{
      this.gists=Object.assign([], result);
      if(this.gists.length==0){
        this.noGists=this.username.concat(' has no gists');
      }
    });
    this.postData.getPostUrl(this.subscriptionurl).subscribe((result)=>{
      this.subscriptions=Object.assign([], result);
      console.log(this.subscriptions);
      if(this.subscriptions.length==0){
        this.noSubs=this.username.concat(' has no subscriptions');
      }
    });
    this.postData.getPostUrl(this.starredurl).subscribe((result)=>{
      this.starred=Object.assign([], result);
      if(this.starred.length==0){
        this.noStar=this.username.concat(' has no starred items');
      }
    });
  }

  ngOnInit(): void {
  }
  goToLink(url: string){
    window.open(url, "_blank");
  }
  goToTwitter(twitterHandle: string){
    window.open('https://twitter.com/'.concat(twitterHandle), "_blank");
  }
  capitalizeFirstLetter(string) {
    if(string!=null){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }else{
      return string;
    }
  }
  closeDialog() {
    this.dialogRef.close();
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
}
