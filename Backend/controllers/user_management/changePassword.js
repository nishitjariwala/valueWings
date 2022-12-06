var dbConnection = require('../../utilities/postgresql-connection.js');
var generateToken = require('../../utilities/generate-token.js');
var validate = require('validator');
var HttpStatusCode = require("http-status-codes");
const { response } = require('../../app.js');
const { json } = require('express');


exports.userChangePassword = function (req, res) {
    
    //fetching all the parameters
    var entityData = {
        id: parseInt(req.params.id),
        old_password: req.body.old_password,
        new_password: req.body.new_password,
    };
    
    function userChangePassword(req, entityData) {
        return new Promise(function (resolve, reject) {
            //to check whether the provided id exists or not and old password added is same or not
            let sqlQuery = "select email from user_detail where password = '"+entityData.old_password+"' AND id = "+ entityData.id+";";
                dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length > 0){
                    //enters when id exist and old password is same
                    //update the new password of the user
                    sqlQuery = "update user_detail set password = '" + entityData.new_password + "' where id=" + entityData.id+";" ;
                    dbConnection.getResult(sqlQuery).then((res)=>{
                        return resolve({
                            status: 205,
                            message: "Password Updated Successfully!!!!"
                        })
                    })
                }
                else{
                    return resolve({
                        status: 401,
                        data : response,
                        message: "Your Id doesnot exist...Or you have entered Old Password Wrong..sa...."
                    });
                }
            })   
        });
    }

    userChangePassword(req, entityData).then(function (response) {
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