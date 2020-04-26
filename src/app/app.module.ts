import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training/training.service';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training/training.module';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,      
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,    
    FlexLayoutModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AuthModule,
    TrainingModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]  
})
export class AppModule { }
