var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");


exports.getAllCarData = function (req, res) {
    
    var entityData = {
    };
    function getAllCarData(req, entityData) {
        return new Promise(function (resolve, reject) {
            
            sqlQuery = "SELECT array_to_json(array_agg(row_to_json (r))) FROM (select make_id, make_name, model_id, model_name from car_data left join make on make.id = car_data.make_id left join model on model.id = car_data.model_id where make_name != 'Honda')r;" ;
            console.log(sqlQuery)
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'All the data......'
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No Data Avaliable'
                    });
                }
            })
        });
    }

    getAllCarData(req, entityData).then(function (response) {
        console.log("It is Here 2")
        res.status(response.status).json({
            data: response.data,
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