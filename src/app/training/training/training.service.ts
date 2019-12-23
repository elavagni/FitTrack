import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;    
    //Avaliable exercises from firestore
    exercisesChanged: Subject<Exercise[]> = new Subject<Exercise[]>();
    //exercise perform by the user
    exerciseChanged: Subject<Exercise> = new Subject<Exercise>();    
    //Exercises finished by the user
    finishedExercisesChanged: Subject<Exercise[]> = new Subject<Exercise[]>();    

    constructor(private db: AngularFirestore){}

    fetchAvaliableExercises() {
       this.db   
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
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        })
    }

    startExercise(selectedId: string) {
        this.db.doc('avaliableExercises/' + selectedId).update({lastSelected: new Date()})
        this.runningExercise  = this.availableExercises.find(ex => ex.id === selectedId);         
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {        
        this.addDataToDatabase({
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed'
        });        
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise, 
            duration: this.runningExercise.duration,
            calories: this.runningExercise.duration * (progress / 100) ,
            date: new Date(), 
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(): Exercise {
        return {...this.runningExercise};
    }
    
    fetchCompletedOrCancelledExercises(){
        this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
        });        
    }


    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }    
}