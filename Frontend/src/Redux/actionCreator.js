import * as ActionTypes from './actionTypes';
import {decrypt} from '../Shared/Decryption';
import {encrypt} from '../Shared/Encryption';





// GET USERDATA


//Password Changing

// User Profile 

// Logout



//get NEWS


//get Car Details
export const getMake = (result) => ({
    type:ActionTypes.GET_MAKE,
    payload:result
})

export const fetchMake = () => (dispatch) => {

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("https://value-wings.herokuapp.com/api/cars/getMake", requestOptions)
    .then((response) => response.json())
    .then((response => response.data.data))
    .then(result => dispatch(getMake(result)))
    .catch(error => console.log('error', error));
}

export const getModel = (result) => ({
    type:ActionTypes.GET_MODEL,
    payload:result
})

export const fetchModel = (id) => (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("Make_id", id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("https://value-wings.herokuapp.com/api/cars/getModel", requestOptions)
    .then((response) => response.json())
    .then((response => {response.data.selectedMake = id; return response.data}))
    .then(result => {dispatch(getModel((result)))})
    .catch(error => console.log('error', error));
}

// get selected Car Details
