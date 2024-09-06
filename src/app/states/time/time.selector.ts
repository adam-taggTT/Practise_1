import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TimeState } from "./time.state";

// Get complete state of the time feature in application
export const selectAppState = createFeatureSelector<AppState>('time');

// Get the state of the time
export const selectTimeState = createSelector(
    selectAppState,
    (state: AppState) => state.time
);

// Get the current time
export const selectLastSeenTime = createSelector(
    selectTimeState,
    (state: TimeState) => state.lastSeenTime
);