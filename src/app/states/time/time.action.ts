import { createAction, props } from "@ngrx/store";

export const setLastSeenTime = createAction(
    '[Time] Set Last Seen Time',
    props<{ lastSeenTime: string }>()
);