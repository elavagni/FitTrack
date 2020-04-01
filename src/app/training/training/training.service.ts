import { Excercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
    private availableExercises: Excercise[] = [   
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExercise: Excercise;
    private exercises: Excercise[] = [];
    exerciseChanged: Subject<Excercise> = new Subject<Excercise>();
    


    getAvaliableExercises() : Excercise[] {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise  = this.availableExercises.find(ex => ex.id === selectedId);         
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {        
        this.exercises.push({
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise, 
            duration: this.runningExercise.duration,
            calories: this.runningExercise.duration * (progress / 100) ,
            date: new Date(), 
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(): Excercise {
        return {...this.runningExercise};
    }
    
    getCompletedOrCancelledExercises(): Excercise[] {
        return this.exercises;
        
    }
    

}