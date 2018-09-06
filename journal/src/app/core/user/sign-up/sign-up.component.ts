import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SignUpService } from '../../../shared/sign-up.service';
import { Value } from '../../../../Value';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, debounce } from 'rxjs/operators';
import { of, timer } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

@Injectable()
export class SignUpComponent implements OnInit {
  [x: string]: any;
  form: NgForm;
  userRegistrationForm: NgForm;
  val: Value[];
  equal: String;

  constructor(
    private router: Router,
    private signupService: SignUpService) {
    type arr = Array<{
      fname: string;
      lname: string;
      name: string;
      email: string;
      password: string;
      confirmPass: string;
    }>;

    this.signupService.getValues()
      .subscribe(values => {
        console.log(values[0]);
      })
  }
  ngOnInit() {
  }

  checkValidity(usname, form) {
    var newObj = { username: usname };
    this.signupService
      .getUserByUsername(newObj)
      .pipe(debounce(() => timer(1000)))
      .subscribe(res => {
        console.log("This is from sign-up component, response from service:", res);
        if (res) {
          console.log("User Exists!");
          form.controls['userName'].setErrors({ 'incorrect': true });
        }

      });
    return 1;
  }

  onSubmit(event, form, formValues) {
    this.router.navigate(['/_']);
    let formVal = Object.values(formValues);
    this.signupService.addVal(formValues).
      subscribe(res => {
      });
  }
} 