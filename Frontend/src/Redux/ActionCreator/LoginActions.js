import * as ActionTypes from '../actionTypes';
import {encrypt} from '../../Shared/Encryption';

//For Login Functionality

export const loginProcessing = ()=> ({
    type : ActionTypes.LOGIN_PROCESSING,
})


export const loginFailed = (err) => ({
    type : ActionTypes.LOGIN_FAILED,
    payload : err
})

export const loginUser = (user) => ({
    type : ActionTypes.LOGIN_USER,
    payload : user
})

export const checkUser = (email,password) => (dispatch) => {
    
    const User = {
        Email : encrypt(email),
        Password : encrypt(password)
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("Email", User.Email);
    urlencoded.append("Password", User.Password);
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    };

    return fetch("https://value-wings.herokuapp.com/api/user/login", requestOptions)
    .then(response => {
            if(response.ok){
                return response;
            }
            else if(response.status === 401){
                return response;
            }
            else{
                var error= new Error('ERROR '+response.status+':'+response.statusText );
                error.response = response;
                throw error;
            }
        }).then(response => response.json())
            .then(response => {
            if(response.message === "Verification is not Done"){
                response.done = false;
                return response;
            };
            if(response.data){
            
            dispatch(loginUser(response.data));
            response.done = true;
            return response;

            }
            else
            response.done = false;
            return response;
            
            })
        .catch(error => {
                console.log(error)})
}

export const logout = () => ({
    type : ActionTypes.LOGOUT,
})

export const logoutUser = () => (dispatch) => {
    dispatch(logout());
};