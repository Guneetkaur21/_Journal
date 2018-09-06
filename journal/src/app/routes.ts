import {Routes } from '@angular/router';
import { HomeComponent } from 'src/app/core/home/home.component';
import { UserComponent } from 'src/app/core/user/user.component';
import { SignUpComponent } from 'src/app/core/user/sign-up/sign-up.component';
import { SignInComponent } from 'src/app/core/user/sign-in/sign-in.component';
import { FrontPageComponent } from 'src/app/core/front-page/front-page.component';
import {AuthenticationService} from './shared/authentication.service';
import {TextFieldComponent} from 'src/app/core/text-field/text-field.component';

export const appRoutes : Routes = [
    {path : 'home', component : HomeComponent ,canActivate: [AuthenticationService]},
    {
        path :'_' , component : FrontPageComponent
    },
    {
        path : 'signup' , component : UserComponent,
        children : [{path : '' , component : SignUpComponent}]
    },
    {
        path : 'login' , component : UserComponent,
        children : [{path :'' , component : SignInComponent}]
    },
    {
        path :'' , redirectTo:'/_',pathMatch:'full' //default path of the application.
    },
    {
        path : 'publish' , component:TextFieldComponent
    },

]; 