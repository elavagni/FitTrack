import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [ 
        SignupComponent,
        LoginComponent
    ],
    imports: [       
        ReactiveFormsModule,      
        AngularFireAuthModule,
        SharedModule,
        AuthRoutingModule       
    ]    
})
export class AuthModule { }
