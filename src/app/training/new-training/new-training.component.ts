import { Component, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Excercise } from '../training/exercise.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Excercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvaliableExercises();
  } 

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
