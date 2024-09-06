import { Action, createReducer, on } from "@ngrx/store";
import { TimeState } from "./time.state";
import { setLastSeenTime } from "./time.action";

export const initialState: TimeState = {
    lastSeenTime: '///UNKNOWN///'
};

const _timeReducer = createReducer(
    initialState,
    // Last Seen Time Action
    on(setLastSeenTime, state => {
        return {
            ...state,
            lastSeenTime: new Date().toLocaleTimeString()
        }
    })
);

export function timeReducer(state: TimeState | undefined, action: Action) {
    return _timeReducer(state, action);
}