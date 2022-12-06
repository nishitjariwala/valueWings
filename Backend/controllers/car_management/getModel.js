var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getCarModel = function (req, res) {
    console.log("in get model method..")    
    var entityData = {
        Make_id : req.body.Make_id,
    };
    
    function getCarModel(req, entityData) {
        return new Promise(function (resolve, reject) {
            //query to fetch model on basis of make id        
            sqlQuery = "select distinct model_id as Model_Id, model_name from car_data  left join model on model.id = car_data.model_id where make_id = "+entityData.Make_id+" order by model.model_name ;" ;
            console.log(sqlQuery)
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'All the model with make_id'
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No model Avaliable for make_id'
                    });
                }
            })
        });
    }

    getCarModel(req, entityData).then(function (response) {
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