import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable,Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogUserprofileComponent>) 
  {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([ 
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
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
