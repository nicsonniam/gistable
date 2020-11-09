import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable,Observer } from 'rxjs';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogUserprofileComponent>) 
  {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([ 
          {
            label: 'Gists', 
            content: []
          },
          {
            label: 'Subscriptions',
            content: []
          },
          {
            label: 'Starred', 
            content: []
          },
        ]);
      }, 1000);
    });
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
}
