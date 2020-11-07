import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  subscriptions: Subscription[] = [];
  data=[];
  apiResult=[];
  apiResultUrl:any;

  constructor(private postData:PostsService)
  {
    this.getApiResponse();
    
  }
  title = 'gistable';
  ngOnInit(){
  }
  getApiResponse() {
    this.postData.getPosts().subscribe((result)=>{
      this.apiResult=Object.assign([], result);
      for(var i=1;i<this.apiResult.length;i++){
        var object = {
          description : this.apiResult[i].description, 
          avatarurl : this.apiResult[i].owner.avatar_url
        }
        this.data.push(object);
      }
    })
  }
  getApiResponseUrl(url:string) {
    this.postData.getPostUrl(url).subscribe((result)=>{
      this.apiResultUrl=result;
    })
  }
}
