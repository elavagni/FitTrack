import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CurrentTrainingComponent } from '../current-training/current-training.component';
import { PastTrainingComponent } from '../past-training/past-training.component';
import { NewTrainingComponent } from '../new-training/new-training.component';
import { MaterialModule } from 'src/app/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { TrainingComponent } from './training.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StopTrainingComponent } from '../current-training/stop-training-component';


@NgModule({
    declarations: [ 
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        TrainingComponent,
        StopTrainingComponent      
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,            
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,           
             
    ],
    exports:[

    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
