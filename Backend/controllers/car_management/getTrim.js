var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getCarTrim = function (req, res) {
    console.log("in get trim method...")
    var entityData = {
        Make_id : req.body.Make_id,
        Model_id : req.body.Model_id,
        Year_id : req.body.Year_id,
    };
    
    function getCarTrim(req, entityData) {
        return new Promise(function (resolve, reject) {
            //query to fetch trim on base of make_id, model_id and year_id
            sqlQuery = "select distinct trim_id, trim_name from car_data left join trim on trim.id = car_data.trim_id where make_id = "+entityData.Make_id+" and model_id = "+entityData.Model_id+"  and car_data.year_id <= "+entityData.Year_id+"  order by trim_name;" ;
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'All the Trim Based on Car Make, Model and Year'
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No trim Avaliable for this year'
                    });
                }
            })
        });
    }

    getCarTrim(req, entityData).then(function (response) {
        console.log("Error while calling main function...")
        res.status(response.status).json({
            data: response.data,
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