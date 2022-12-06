var dbConnection = require('../../utilities/postgresql-connection.js');
var generateToken = require('../../utilities/generate-token.js');
var validate = require('validator');
var HttpStatusCode = require("http-status-codes");
const { response } = require('../../app.js');
const { json } = require('express');

exports.userUpdate = function (req, res) {
      //fetching all the parameters
    var entityData = {
        id: parseInt(req.params.id),
        phone_no: req.body.phone_no,
        city: req.body.city,
        f_name: req.body.f_name,
        l_name: req.body.l_name,
    };
    
    function userUpdate(req, entityData) {
        return new Promise(function (resolve, reject) {
            //update the user details
            sqlQuery = "update user_detail set f_name = '" + entityData.f_name + "', l_name = '" + entityData.l_name + "', city = '" + entityData.city + "', phone_no ='" + entityData.phone_no + "' where id=" + entityData.id+";" ;
            console.log("update 1......");
            console.log(sqlQuery);
            dbConnection.getResult(sqlQuery).then(function (response) {
                
                return resolve({
                    status: 204,
                    data: response,
                    message: 'User Profile Updated successfully!!!!!'
                });
                                   
            })
            
        });
    }

    userUpdate(req, entityData).then(function (response) {
        res.status(response.status).json({
            data: response.token,
            message: response.message
        });
    })
    .catch(function (error) {
        console.log("This is Running")
        res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
            data: error.data,
            message:"wrong"
        });
    });
}