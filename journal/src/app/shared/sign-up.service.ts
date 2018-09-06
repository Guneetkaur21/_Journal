import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http/src/params';

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) {
    console.log("Sign-Up Service Initailised");
  }

  getValues() {
    return this.http.get('http://localhost:4000/api/tasks')
      .pipe(map((res: Response) => res))
  }

  getUserByUsername(values) {
    let headers = new HttpHeaders();
    var y = values.username;
    var x = y.toLowerCase();
    values.username = x;
    return this.http.post("http://localhost:4000/api/task/username", values, { headers: headers })
      .pipe(map((res: Response) => res));
  }

  addVal(values) {
    let headers = new HttpHeaders();
    var y = values.userName;
    var x = y.toLowerCase();
    values.userName = x;
    return this.http.post("http://localhost:4000/api/task", values, { headers: headers })
      .pipe(map((res: Response) => res));
  }

  findUser(values) {
    let headers = new HttpHeaders();
    var y = values.username;
    var x = y.toLowerCase();
    values.username = x;
    return this.http.post("http://localhost:4000/api/task/name", values, { headers: headers })
      .pipe(map((res: Response) => res));
  }


}