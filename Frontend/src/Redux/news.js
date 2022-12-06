import * as ActionType from './actionTypes';

export const News = (state = {
    news:null,
    err:null,
},action) => {
    switch(action.type){
        case ActionType.GET_NEWS:
            return {...state,news:action.payload,err:null}
        case ActionType.GET_NEWS_FAILED:
            return {...state,news:null,err:action.payload}
        default:
        return state;
    }
}