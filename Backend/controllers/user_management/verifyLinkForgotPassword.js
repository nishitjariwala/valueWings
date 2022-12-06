var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");
const { json } = require('express');
const jwt_decode = require('jwt-decode');
const { PERMANENT_REDIRECT } = require('http-status-codes');
var jwt = require('jsonwebtoken');
var settings = require('../../config');
const nodemailer = require('nodemailer');
var file1 = require('../../utilities/encryption');
var file2 = require('../../utilities/decryption');
// const jwt_decode = require('jwt-decode');



exports.verifyLinkForForgotPassword = function (req, res) {
    console.log("in verify link forgot password  method.....")
    var entityData = {
        token: req.params.token,  
    };
    
    function verifyLinkForForgotPassword(req,res, entityData) {
        return new Promise(function (resolve, reject) {
             //decode token to get id and verify user exist or not                
            
            var decode = JSON.parse(file2(entityData.token));
            var id = decode.Id;
            var email = decode.Email;
            
            //query to know wether token still exist/valid or not
            let sqlQuery = "select id from user_verification where user_id = "+id+" and fp_token = '"+entityData.token+"';";
            dbConnection.getResult(sqlQuery).then((response)=>{
                //if token exist it will enter to if
                if(response.data.length>0){
                    //query to delete the token once user have clicked on it
                    //by deleting the token the user cannot use the verification link more than one time
                    sqlQuery="delete from user_verification where user_id = "+id+" and fp_token = '"+entityData.token+"';"
                    dbConnection.getResult(sqlQuery).then((response)=>{
                        
                        //token send through forgot password link to get the id back while inserting new password to table
                         var tokenInfo = ({
                            Id: id,
                            Time: Date.now(),
                         })
                         
                        var token = file1(JSON.stringify(tokenInfo));
                        console.log("Redirect Token")
                        console.log(token)
                        /**
                        *   Enter Link for forgot password Front end page from here 
                        */    
                        res.redirect('https://valuewings-live.herokuapp.com/forgotPasswordRedirect?token='+token);
                        //res.redirect('https://valuewings-1.herokuapp.com/forgotPasswordRedirect?token='+token);
                        console.log("1234567890987654")
 
                     })
                }
                else{
                    return resolve({
                        status: 200,
                        token: json.data,
                        data: response,
                        message: 'This Link is Disabled'
                    });
                }
            })
            
  
            
        });
    }

    verifyLinkForForgotPassword(req,res, entityData).then(function (response) {
        console.log("Error while calling main function...")
        res.status(response.status).json({
            data: response.token,
            message: response.message
        });
    })
    .catch(function (error) {
        console.log("Catch called while calling main function...")
        res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
            data: error.data,
            message:"wrong"
        });
    });



    
}