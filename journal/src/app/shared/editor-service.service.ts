import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http/src/params';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EditorServiceService {

  private user = new BehaviorSubject<string>('');   //for communication
  cast = this.user.asObservable();                  //for communication

  constructor(private http: HttpClient) {
    console.log("The editor service is initialised.")
  }

  editorContent(content) {
    let headers = new HttpHeaders();
     console.log("content which we get in editor service:", JSON.stringify(content));
     var y = content.username;
    var x = y.toLowerCase();
    content.username = x;
    return this.http.post("http://localhost:4000/api/content", content, { headers: headers })
      .pipe(map((res: Response) => res));
  }

  geteditorContent(name) {
    let headers = new HttpHeaders();
    var x = name.toLowerCase();
    var obj = {
      username: x 
    };
    return this.http.post("http://localhost:4000/api/display_content", obj, { headers: headers })
      .pipe(map((res: Response) => res));
  }

  ReadMore(obj) {
    this.user.next(obj);

  }
}
