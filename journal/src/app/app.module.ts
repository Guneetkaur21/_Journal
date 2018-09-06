import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpComponent } from './core/user/sign-up/sign-up.component';
import { HttpModule } from '@angular/http'; 
import { HttpClientModule } from '@angular/common/http';
import {Value} from '../Value';
import { UserComponent } from './core/user/user.component';
import { SignInComponent } from './core/user/sign-in/sign-in.component';
import { HomeComponent } from './core/home/home.component';
import {RouterModule} from '@angular/router';
import { appRoutes } from 'src/app/routes';
import { HeaderComponent } from './core/header/header.component';
import { MenuComponent } from './core/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontPageComponent } from './core/front-page/front-page.component';
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module';
import {AuthenticationService} from './shared/authentication.service';
//import { NgxEditorModule } from 'ngx-editor';
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TextFieldComponent } from './core/text-field/text-field.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {EditorServiceService} from './shared/editor-service.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    FrontPageComponent,
    
  ],
  imports: [
    //FroalaEditorModule.forRoot(), 
    //FroalaViewModule.forRoot(),
    EditorModule,
    CoreModule,
    SharedModule,
    BrowserModule,
   BrowserAnimationsModule,
    FormsModule,
    HttpModule, 
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthenticationService,EditorServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }


//--disable-web-security --user-data-dir=c:\my\data


// styles : 
// "./node_modules/froala-editor/css/froala_editor.pkgd.min.css",
// "./node_modules/froala-editor/css/froala_style.min.css",
// "./node_modules/font-awesome/css/font-awesome.css",
// "./node_modules/froala-editor/css/froala_editor.pkgd.min.css" 

// scripts :
// "./node_modules/jquery/dist/jquery.min.js",
//   "./node_modules/froala-editor/js/froala_editor.pkgd.min.js",
//   "./node_modules/froala-editor/js/froala_editor.min.js"
