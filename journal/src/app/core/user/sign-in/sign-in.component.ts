import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../../../shared/sign-up.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  arr: any;
  constructor(
    private router: Router,
    private signupService: SignUpService) {
    type arr = Array<{
      name: string;
      password: string;
    }>;
  }

  ngOnInit() {
  }

  onSubmit(event, form) {
    console.log("In the login submission form");
    let formVal = Object.values(form);
    this.signupService.findUser(form).
      subscribe(res => {
        if (res) {
          let sessionStorage = window.sessionStorage;
          sessionStorage.setItem("name", "" + formVal[0]);
          this.router.navigate(['/home']);
        } else {
          alert("Wrong Username and password");
          this.router.navigate(['/login']);
        }
      });
  }
}
