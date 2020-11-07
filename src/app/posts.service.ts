import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url = "https://api.github.com/gists/public"
  constructor(
    private http:HttpClient
  ) {

  }
  public getPosts(){
    return this.http.get(this.url);
  }
  public getPostUrl(urlString:string){
    return this.http.get(urlString);
  }
}
