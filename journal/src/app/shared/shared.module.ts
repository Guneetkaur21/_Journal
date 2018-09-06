import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpService } from './sign-up.service';
import {AuthenticationService} from './authentication.service';
import {EditorServiceService} from './editor-service.service';


@NgModule({
  imports: [
    CommonModule,
  
  ],
  declarations: [],
  providers : [SignUpService , AuthenticationService,EditorServiceService],
  exports : []
})
export class SharedModule { }
