import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../training/exercise.model';
import { UIService } from 'src/app/shared/ui.service';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy{ 
  
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;
  isLoading:boolean = false;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {   
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    })

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
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }   
    
  }

}
