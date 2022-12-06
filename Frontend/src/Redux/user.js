import * as ActionTypes from './actionTypes'


export const Users = (state = {
    isLoading:false,
    isLoggedIn : false,
    err:null,
    user : ''
},action)=>{
    switch(action.type){
        case ActionTypes.REGISTER_USER:
            return {...state, isLoading : false, isLoggedIn : true, err:null, user : action.payload};
        case ActionTypes.REGISTER_PROCESSING:
            return {...state, isLoading : true, isLoggedIn : false, err:null, user : null};
        case ActionTypes.REGISTER_FAILED:                
            return {...state, isLoading : false, isLoggedIn : false, err:action.payload, user : null};
        case ActionTypes.LOGIN_USER:
            return {...state, isLoading : false, isLoggedIn : true, err:null, user : action.payload};
        case ActionTypes.LOGIN_PROCESSING:
            return {...state, isLoading : true, isLoggedIn : false, err:action.payload, user : null};
        case ActionTypes.LOGIN_FAILED:
            return {...state, isLoading : false, isLoggedIn : false, err:action.payload, user : null};
        case ActionTypes.LOGOUT:
           
            return {...state,isLoading : false, isLoggedIn : false, err:action.payload, user : null};
        default:
            return state;
    }
}
export const PassChange = (state = {
    isLoading:false,
    err:null,
    msg:null
},action) =>{
    switch(action){
        case ActionTypes.PASSWORD_CHANGED:
            return{...state,isLoading:false,err:null,msg:action.payload};
        case ActionTypes.PASSWORD_PROCESSING:
            return{...state,isLoading:true,err:null,msg:null};
        case ActionTypes.PASSWORD_FAILED:
            return{...state,isLoading:false,err:action.payload,msg:null};
        default:
            return state;
    }
}
// export const UserData = (state = {
//     user:null,
//     err:null,
//     isLoading:false
//     },action) =>{
//         switch(action){
//             case ActionTypes.GET_USER:
//                 return{...state,user:action.payload,err:null,isLoading:false}
//             case ActionTypes.GET_USER_PROCESSING:
//                 return{...state,user:null,err:null,isLoading:true}
//             case ActionTypes.GET_USER_FAILED:
//                 return{...state,user:null,err:action.payload,isLoading:false}
//             case ActionTypes.UPDATE_USER:
//                 return{...state,user:action.payload,err:null,isLoading:false}
//             case ActionTypes.UPDATE_PROCESSING:
//                 return{...state,user:null,err:null,isLoading:true}
//             case ActionTypes.UPDATE_FAILED:
//                 return{...state,user:null,err:action.payload,isLoading:false}
//             default:
//                 return state;
//         }
//     }

export const Profile = (state = {
    data: {},
    isLoading : false,
    err : null,
},action) => {
    switch(action){
        case ActionTypes.GET_USER:
            return{...state,user:action.payload,err:null,isLoading:false}
        case ActionTypes.GET_USER_PROCESSING:
            return{...state,user:null,err:null,isLoading:true}
        case ActionTypes.GET_USER_FAILED:
            return{...state,user:null,err:action.payload,isLoading:false}
        case ActionTypes.PROFILE_CHANGED:
            return {...state, data:action.payload,isLoading:false,err:null}
        case ActionTypes.PROFILE_PROCESSING:
            return {...state, data:null,isLoading:true,err:null}
        case ActionTypes.PROFILE_FAILED:
            return {...state, data:null,isLoading:false,err:action.payload}
        default:
            return state;
    }
}