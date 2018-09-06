//--disable-web-security --user-data-dir=c:\my\data
import { Component } from '@angular/core';
import { SignUpService } from './shared/sign-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[SignUpService],
 
})
export class AppComponent {

  
  
}
