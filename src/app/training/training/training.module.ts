import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CurrentTrainingComponent } from '../current-training/current-training.component';
import { PastTrainingComponent } from '../past-training/past-training.component';
import { NewTrainingComponent } from '../new-training/new-training.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { TrainingComponent } from './training.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StopTrainingComponent } from '../current-training/stop-training-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
    declarations: [ 
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        TrainingComponent,
        StopTrainingComponent      
    ],
    imports: [
       SharedModule,
        AppRoutingModule,       
        AngularFirestoreModule,       
        ReactiveFormsModule,
        AuthModule,
        TrainingRoutingModule         
    ],    
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
