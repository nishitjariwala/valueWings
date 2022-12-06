var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");
const jwt_decode = require('jwt-decode');
var generatePrice = require('../../utilities/generate-price');
var file1 = require('../../utilities/encryption');
var file2 = require('../../utilities/decryption');

exports.getAllCarTrimPrice = function (req, res) {
    
    var entityData = {
        Make_id : req.body.Make_id,
        Model_id : req.body.Model_id,
        Year_id : req.body.Year_id,
        kms : req.body.kms,
        token: req.body.token,
        month: req.body.Month_id
    };
    console.log("in get price method..."); 

    function getAllCarTrimPrice(req, entityData) {
        return new Promise(function (resolve, reject) {

            sqlQuery="select distinct year_id as Year_Id, year from car_data  left join year on year.id = car_data.year_id where make_id = '"+entityData.Make_id+"' and model_id = '"+entityData.Model_id+"' and year>=(select year from year where id = '"+entityData.Year_id+"') order by year ;";
            dbConnection.getResult(sqlQuery).then((response)=>{
                console.log(",,,,,,,,,,................")
                console.log(response.data.length)
                return resolve({
                    status: 200,
                    data: response.data,
                    message: 'Succesfully got the all the selected car details, original price and saved  as history...'
                });
            });
            
        });
    }

    getAllCarTrimPrice(req, entityData).then(function (response) {
        console.log("Error while calling main function....")
        res.status(response.status).json({
            data: response.data,
            message: response.message
        });
    })
    .catch(function (error) {
        console.log("Catch called while calling main function...")
        res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
            data: error.data,
            message:"wrong..."
        });
    });   
}