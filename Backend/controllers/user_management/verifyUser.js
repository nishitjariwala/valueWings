var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");
const { json } = require('express');
const jwt_decode = require('jwt-decode');
var file1 = require('../../utilities/encryption');
var file2 = require('../../utilities/decryption');

exports.userVerify = function (req, res) {
    console.log("in verify user method.....")
    var entityData = {
        token: req.params.token,  
    };
    
    function userVerify(req, res, entityData) {
        return new Promise(function (resolve, reject) {
            //decode token to get id and verify user exist or not        
            
            var decode = JSON.parse(file2(entityData.token));
            var id = decode.Id;
            

            //query to know wether token exist/valid or not
            sqlQuery = "select * from user_verification where user_id = "+id+" and token = '"+entityData.token+"';";
            dbConnection.getResult(sqlQuery).then((response)=>{
                //if token exist it will enter to if
                if(response.data.length>0){
                    //query to update the user active status
                    sqlQuery="update user_detail set active = true where id = "+id+";";
                    dbConnection.getResult(sqlQuery).then((response)=>{
                        //query to delete the token once user active status is changed 
                        //by deleting the token the user cannot use the verification link more than one time
                        sqlQuery="delete from user_verification where user_id = "+id+" and token = '"+entityData.token+"';"
                        dbConnection.getResult(sqlQuery).then((response)=>{
                            /**
                                    **** // redirect to home page directly****
                             */
                            console.log(response);
                            
                            //res.redirect('https://valuewings-live.herokuapp.com/login');
                            res.redirect('https://valuewings-live.herokuapp.com/login?verified=true');
                            //res.redirect('https://valuewings-1.herokuapp.com/login?verified=true');
                        })
                    })
                   
                }
                // if token doesnot exist...or user clicked more than once on same verify link
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

    userVerify(req,res, entityData).then(function (response) {
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