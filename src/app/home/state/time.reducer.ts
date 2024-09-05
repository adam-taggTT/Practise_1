import { createAction, createReducer, on } from "@ngrx/store";

export const timeReducer = createReducer(
    { currentTime: '///UNKNOWN///' },
    on(createAction('[Home] Set Last Seen Time'), state => {
        console.log('[Debug] Action dispatched');
        return{
            ...state,
            currentTime: new Date().toLocaleTimeString()
        }
    })
);