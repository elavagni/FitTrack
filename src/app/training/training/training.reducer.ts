import { TrainingActions, 
         SET_AVAILABLE_TRAININGS, 
         SET_FINISHED_TRAININGS, 
         START_ACTIVE_TRAINING, 
         STOP_ACTIVE_TRAINING, 
         StartActiveTraining
} from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../../app.reducer';
import { STATE_PROVIDERS } from '@ngrx/store/src/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    avaliableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State  {
    training: TrainingState;
}

export const initialState: TrainingState = {
    avaliableExercises: [],
    finishedExercises: [],
    activeTraining: null,

};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                avaliableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case START_ACTIVE_TRAINING:
            return {
                ...state,
                activeTraining: {
                                    ...state.avaliableExercises.find(ex => ex.id === action.payload)
                                }
            };
        case STOP_ACTIVE_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default:
            return state;
    }    
}



export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvaliableExercises = createSelector(getTrainingState, (state: TrainingState) => state.avaliableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
