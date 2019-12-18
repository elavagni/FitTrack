import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Excercise } from '../training/exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  exercises: Excercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvaliableExercises();
  } 

  onStartTraining() {
    this.trainingStart.emit();
  }

}
