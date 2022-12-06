import * as ActionTypes from '../actionTypes';
import {encrypt} from '../../Shared/Encryption';
import {decrypt} from '../../Shared/Decryption';

export const passwordProcessing = ()=> ({
    type : ActionTypes.PASSWORD_PROCESSING,
})


export const passwordFailed = (err) => ({
    type : ActionTypes.PASSWORD_FAILED,
    payload : err
})

export const passwordChanged = (user) => ({
    type : ActionTypes.PASSWORD_CHANGED,
    payload : user
})

export const changePwd = (obj) => (dispatch) => {
    let Passwords = {
        old_password : encrypt(obj.old_password),
        new_password : encrypt(obj.new_password)
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    var urlencoded = new URLSearchParams();
    urlencoded.append("old_password", Passwords.old_password);
    urlencoded.append("new_password", Passwords.new_password);
    
    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
    
    
    };

    return fetch("https://value-wings.herokuapp.com/api/user/changePassword/"+obj.id, requestOptions)
    .then(response => {
        if(response.status === 205){
            return true;
        }   
        else if(response.status === 401){
            return false;
        }
        else{
            var error= new Error('ERROR '+response.status+':'+response.statusText );
            error.response = response;
            throw error;
        }
    }).then(response => {dispatch(passwordChanged(response));return response})
    .catch(error => console.log(error))
}

