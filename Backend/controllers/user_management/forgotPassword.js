var dbConnection = require('../../utilities/postgresql-connection.js');

var HttpStatusCode = require("http-status-codes");
var decrypt = require('../../utilities/decryption')
const jwt_decode = require('jwt-decode');

exports.userForgotPassword = function (req, res) {
    //fetching all the parameters
    var entityData = {
        token: req.body.token,
        new_password: req.body.new_password,
    };

    function userForgotPassword(req, entityData) {
        return new Promise(function (resolve, reject) {
            var decode = JSON.parse(decrypt(entityData.token));
            //var decode = jwt_decode(entityData.token)
            var id = decode.Id
            //to check wether id exist or not
            let sqlQuery = "select id from user_detail where id = "+ id+";";
            console.log("jajshadjhajalakljoiqjkjaza");
            console.log(sqlQuery);
            dbConnection.getResult(sqlQuery).then((response)=>{
                console.log(response);
                if(response.data.length > 0){
                    //enters if id exist
                    //update the new password to the user using id
                    sqlQuery = "update user_detail set password = '" + entityData.new_password + "' where id=" + id+";" ;
                    dbConnection.getResult(sqlQuery).then((res)=>{
                        return resolve({
                            status: 205,
                            message: "Password Changed Successfully!!!!"
                        })
                    })
                }
                else{
                    return resolve({
                        status: 401,
                        data : response,
                        message: "Your Id doesnot exist..."
                    });
                }
            })   
        });
    }

    userForgotPassword(req, entityData).then(function (response) {
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