import { SET_PROJECT_SETTING } from "../actions/types";

const initialState = {
    isDay: false
}

export default function projectSetting(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_PROJECT_SETTING:
            return {
                ...state,
                isDay: payload
            };
            break;
        default:
            return state;
    }
}