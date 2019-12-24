import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training/training.service';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,          
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,    
    FlexLayoutModule,        
    AppRoutingModule,
    AuthModule,
    AngularFirestoreModule,   
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]  
})
export class AppModule { }
