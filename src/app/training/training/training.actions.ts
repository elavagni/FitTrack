import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Avaliable Trainings';
export const SET_FINISHED_TRAININGS= '[Training] Set Finished Trainings';
export const START_ACTIVE_TRAINING= '[Training] Start Active Training';
export const STOP_ACTIVE_TRAINING= '[Training] Stop Active Training';


export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;

    constructor(public payload: Exercise[]) {}
}

export class StartActiveTraining implements Action {
    readonly type = START_ACTIVE_TRAINING;

    constructor(public payload: string) {}
}

export class StopActiveTraining implements Action {
    readonly type = STOP_ACTIVE_TRAINING;    
}

export type TrainingActions =  SetAvailableTrainings | SetFinishedTrainings | StartActiveTraining |  StopActiveTraining;                           

