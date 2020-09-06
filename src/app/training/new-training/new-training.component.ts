import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exercise.model';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../../training/training/training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{ 
  
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  
  constructor(private trainingService: TrainingService, 
              private store: Store<fromTraining.TrainingState>) { }

  ngOnInit() {      
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);          
    this.exercises$ = this.store.select(fromTraining.getAvaliableExercises);    
    this.fetchExercises();
  }   

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  } 
    
}


