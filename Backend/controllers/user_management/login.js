var dbConnection = require('../../utilities/postgresql-connection');
var HttpStatusCode = require("http-status-codes");
var encrypt = require('../../utilities/encryption')

exports.userLogin = function (req, res) {
      //fetching all the parameters
    var entityData = {
        Email: req.body.Email,
        Password : req.body.Password
    };
    
    function validateFields(req, res) {
        return new Promise(function (resolve, reject) {
            return resolve({
                status: HttpStatusCode.StatusCodes.OK,
                data: entityData
            });
        });
    }

    function userLogin(req, entityData) {
        return new Promise(function (resolve, reject) {
            //login on the basis of email and password parameter
            sqlQuery = "SELECT * FROM user_detail WHERE email = '" + entityData.Email + "' AND password = '" + entityData.Password + "';";
            console.log(sqlQuery)
            dbConnection.getResult(sqlQuery).then(function (response) {
                if (response.data.length > 0) {
                    if(response.data[0].active==true){
                        console.log(response.data[0].active)
                        console.log("sdfghjkljhgf")

                        var login_data = {
                            "Id": response.data[0].id,
                            "email":response.data[0].email
                        }
                        
                        console.log("response data");
                        console.log(login_data);
                        var json =  encrypt(JSON.stringify(login_data));
                        console.log(json)
                        //var json = generateToken(response.data[0]);
                        return resolve({
                            status: 200,
                            token: json,
                            data: json,
                            message: 'User login successfully.......',
                        });    
                    }
                    else{
                        console.log(response.data)
                        
                        return resolve({
                            status: 401,
                            // token: json.data,
                            data: response,
                            message: 'Verification is not Done',
                        });
                    }
                 } else {
                    return resolve({
                        status: 401,
                        data: [],
                        message: 'Invalid credentials!!!'
                    });
                }                
            })
            .catch(function (error) {
                res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
                    data: error.data
                });
            });
        });
    }

    validateFields(req, res).then(function (response) {
        userLogin(req, response.data).then(function (response) {
            res.status(response.status).json({
                data: response.token,
                message: response.message
            });
        })
        .catch(function (error) {
            res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
                data: error.data
            });
        });
    })
    .catch(function (error) {
        console.log("Catch called while calling main function...")
        res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
            data: error.data
        });
    });
    
}