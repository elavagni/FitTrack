import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from "@ngrx/store";

import { CurrentTrainingComponent } from '../current-training/current-training.component';
import { PastTrainingComponent } from '../past-training/past-training.component';
import { NewTrainingComponent } from '../new-training/new-training.component';
import { AuthModule } from '../../auth/auth.module';
import { TrainingComponent } from './training.component';
import { StopTrainingComponent } from '../current-training/stop-training-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from './training.reducer';



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
        TrainingRoutingModule,               
        ReactiveFormsModule,
        AuthModule,
        TrainingRoutingModule,   
        StoreModule.forFeature('training', trainingReducer)      
    ],    
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
