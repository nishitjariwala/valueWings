import * as ActionTypes from '../actionTypes';
import {encrypt} from '../../Shared/Encryption';

export const registerProcessing = ()=> ({
    type : ActionTypes.REGISTER_PROCESSING,
})


export const registerFailed = (err) => ({
    type : ActionTypes.REGISTER_FAILED,
    payload : err
})


export const postUser = (email,password) => (dispatch) => {
   
    const User = {
        Password : encrypt(password),
        Email : encrypt(email)
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
      redirect: 'follow'
    };
    
    return fetch("https://value-wings.herokuapp.com/api/user/signup", requestOptions)
    .then(response => {
        
            if(response.ok){
                
                return response;

            }   
            else if(response.status === 409){
                return response;
                
            }
            else{
                var error= new Error('ERROR '+response.status+':'+response.statusText );
                error.response = response;
                throw error;
            }
        }).then(response => response)
        .catch(error => {
                console.log(error);dispatch(loginFailed(error));})
}

export const loginFailed = (err) => ({
    type : ActionTypes.LOGIN_FAILED,
    payload : err
})