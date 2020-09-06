import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exercise.model';
import { Store } from "@ngrx/store";
import * as fromTraining from '../training/training.reducer'


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
  
  constructor(private trainingService: TrainingService, 
              private store: Store<fromTraining.TrainingState>) { }

  ngOnInit() {
   this.store.select(fromTraining.getFinishedExercises).subscribe(
        (exercises: Exercise[]) => {
          this.dataSource.data = exercises;
        }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
