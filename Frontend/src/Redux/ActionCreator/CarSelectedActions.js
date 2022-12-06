import * as ActionTypes from '../actionTypes';
export const selectedCar = (selected) => ({
    type:ActionTypes.SELECTED_CAR,
    payload: selected
})
export const clearCars = () => ({
    type:ActionTypes.CLEAR_DETAILS,
})
export const setCar = (selected) => (dispatch) => {
    
    dispatch(selectedCar(selected));
}
export const clearDetails = () => (dispatch) => {
    dispatch(clearCars);
}