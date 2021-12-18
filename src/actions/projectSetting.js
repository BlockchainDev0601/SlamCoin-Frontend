import { GET_PROJECT_SETTING, SET_PROJECT_SETTING, PROJECT_SETTING_LOADED } from "./types";

export const setSetting = (isDay) => async(dispatch) => {
    dispatch({
        type: SET_PROJECT_SETTING,
        payload: isDay
    });
}