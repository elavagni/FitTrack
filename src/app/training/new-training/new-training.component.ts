import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exercise.model';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy{ 
  
  exercises: Exercise[];
  private exerciseSubscription: Subscription;  
  isLoading$: Observable<boolean>;
  
  constructor(private trainingService: TrainingService, 
              private store: Store<fromRoot.State>) { }

  ngOnInit() {      
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);        

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    
    this.fetchExercises();
  }   

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }   
    
  }

}
