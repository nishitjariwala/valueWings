import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Users,PassChange,Profile } from "./user";
import {News} from './news';
import { Cars,Selected  } from './car';
import {loadState,saveState} from '../Shared/LocalState';
const persistedState = loadState()
export const configureStore = ()=>{
    const store = createStore(
        combineReducers({
        Users : Users,
       // UserData : UserData,
        PassChange :PassChange,
        Profile :Profile,
        News: News,
        Cars: Cars,
        Selected : Selected
    }),persistedState,applyMiddleware(thunk));
    
    
    store.subscribe(()=>{
        saveState(store.getState());
    })
    
    return store;
}