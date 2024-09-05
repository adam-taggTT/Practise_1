import { createAction, createReducer, on } from "@ngrx/store";

export const timeReducer = createReducer(
    { currentTime: '///UNKNOWN///' },
    on(createAction('[Home] Set Last Seen Time'), state => {
        return{
            ...state,
            currentTime: new Date().toLocaleTimeString()
        }
    })
);