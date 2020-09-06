import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import * as UI from '../../shared/ui.actions';
import * as fromTraining from '../../training/training/training.reducer';
import * as Training from '../../training/training/training.actions';
import { UIService } from '../../shared/ui.service';

@Injectable()
export class TrainingService {
    
    private fbSubs: Subscription[] = [];
           
    constructor(private db: AngularFirestore, 
                private uiService: UIService,
                private store: Store<fromTraining.State>) {}

    fetchAvaliableExercises() {       
        this.store.dispatch(new UI.StartLoading())
        this.fbSubs.push(this.db   
            .collection('avaliableExercises')
            .snapshotChanges()
            .pipe(          
                map(docArray => {
                return docArray.map(doc => {
                    return {
                        id:doc.payload.doc.id,
                        name: doc.payload.doc.data()["name"],
                        duration: doc.payload.doc.data()["duration"],
                        calories: doc.payload.doc.data()["calories"]
                        }
                    });                              
                })
            ).subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetAvailableTrainings(exercises));
                this.store.dispatch(new UI.StopLoading())
        }, error => {
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000)
            this.store.dispatch(new Training.StopActiveTraining());
        }))        
    };

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartActiveTraining(selectedId));
    }

    completeExercise() {        
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex, 
                date: new Date(), 
                state: 'completed'
            });        
            this.store.dispatch(new Training.StopActiveTraining());
        })
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex, 
                duration: ex.duration,
                calories: ex.duration * (progress / 100) ,
                date: new Date(), 
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopActiveTraining());
        });
        
    }
  
    fetchCompletedOrCancelledExercises(){
        this.fbSubs.push(this.db   
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        }));        
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            sub.unsubscribe();
        })
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }    
}