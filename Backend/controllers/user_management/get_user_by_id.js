var StatusCode = require('http-status-codes');
var dbConnection = require('../../utilities/postgresql-connection.js');
var settings = require('../../config.js');
var validate = require('validator');
var HttpStatusCode = require("http-status-codes");
var decryptionFile = require("../../utilities/decryption")
var encryptionFile = require("../../utilities/encryption");

exports.getUserById = function (req, res) {
    var entityData = {
        Id: req.params.id
    };

    function validateFields(req, res) {
        return new Promise(function (resolve, reject) {
            return resolve({
                status: HttpStatusCode.StatusCodes.OK,
                data: entityData
            });
        });
    }


    

    function getUserById(req, entityData) {
        return new Promise(function (resolve, reject) {
            const sqlQuery = 'SELECT * FROM user_detail WHERE id = '+ entityData.Id+';';
            //to get the user data by id
            dbConnection.getResult(sqlQuery).then(function (response) {
                if (response.data.length > 0) {
                   console.log(response)
                   console.log(response.data[0].f_name)
                    var user_data={
                        "email": decryptionFile(response.data[0].email),
                        "city": response.data[0].city==null?"":decryptionFile(response.data[0].city),
                        "phone_no": response.data[0].phone_no==null?"":decryptionFile(response.data[0].phone_no),
                        "l_name": response.data[0].l_name==null?"":decryptionFile(response.data[0].l_name),
                        "f_name": response.data[0].f_name==null ? "" : decryptionFile(response.data[0].f_name),
                        

                    }
                    console.log(user_data);
                    var response_data=encryptionFile(JSON.stringify(user_data))
                    console.log("hduhdwuj")
                    console.log(JSON.stringify(user_data))
                    console.log(response_data)

                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        token:response_data, 
                        data: {"data":response_data},
                        message: 'Record listed successfully!!!!'
                    });
                } else {
                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: [],
                        message: 'No record found!!!'
                    });
                }                
            })
            .catch(function (error) {
                res.status(error.status).json({
                    data: error.data
                });
            });
        });
    }

    validateFields(req, res).then(function (response) {
        getUserById(req, response.data).then(function (response) {
            res.status(response.status).json({
                data: response.data.data,
                message: response.message
            });
        })
        .catch(function (error) {
            res.status(error.status).json({
                data: error.data
            });
        });
    })
    .catch(function (error) {
        res.status(error.status).json({
            data: error.data
        });
    });
    
}