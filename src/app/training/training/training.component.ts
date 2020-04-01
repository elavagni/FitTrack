import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining = false;
  exerciseSubscription:Subscription;
  
  constructor(private trainingService: TrainingService) { }
  

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
        exercise => {
        if(exercise) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        } 
      });
  }

}
