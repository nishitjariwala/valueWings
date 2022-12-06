import * as ActionTypes from '../actionTypes';
import {decrypt} from '../../Shared/Decryption';
import {encrypt} from '../../Shared/Encryption';

export const getUserProcessing = ()=> ({
    type : ActionTypes.GET_USER_PROCESSING,
})


export const getUserFailed = (err) => ({
    type : ActionTypes.GET_USER_FAILED,
    payload : err
})

export const getUser = (user) => ({
    type : ActionTypes.GET_USER,
    payload : user
})

export const getData = (id) => (dispatch) => {
        
        var requestOptions = {
            method: 'GET',
        };
        return  fetch("https://value-wings.herokuapp.com/api/user/getProfile/"+id, requestOptions)
        .then(response => {
        if(response.ok)
        return response.json();
        else{
            
            let Err = new Error('Error :' + response.status + ":"+ response.statusText);
            throw Err; 
        }
        }).then(response => JSON.parse(decrypt(response.data)))
        .then(response =>  { dispatch(getUser(response));return response})
        .catch(error => {dispatch(getUserFailed(error))})
}


//update profile


export const profileProcessing = () => ({
    type : ActionTypes.PASSWORD_PROCESSING,
})


export const profileFailed = (err) => ({
    type : ActionTypes.PASSWORD_FAILED,
    payload : err
})

export const profileChanged = (user) => ({
    type : ActionTypes.PASSWORD_CHANGED,
    payload : user
})

export const updateProfile = (new_profile) => (dispatch) => {
    
    let Profile = {
       f_name :new_profile.f_name !== '' ? encrypt(new_profile.f_name) : null,
       l_name : new_profile.l_name !== '' ? encrypt(new_profile.l_name) : null,
       phone_no : new_profile.phone_no !== '' ? encrypt(new_profile.phone_no) : null,
       city : new_profile.city !== '' ? encrypt(new_profile.city) : null
   }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("f_name", Profile.f_name);
    urlencoded.append("l_name", Profile.l_name);
    urlencoded.append("phone_no", Profile.phone_no);
    urlencoded.append("city", Profile.city);
    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

return fetch("https://value-wings.herokuapp.com/api/user/updateProfile/"+new_profile.id, requestOptions)
    .then(response => {
        if(response.status === 204){
            return true;
        }   
        else{
            var error= new Error('ERROR '+response.status+':'+response.statusText );
            error.response = response;
            throw error;
            
        }
    }).then(response => {dispatch(profileChanged(response));return response})
    .catch(error => {dispatch(profileFailed(error)); console.log(error) ;return false})
}
