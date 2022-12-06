var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getCarYear = function (req, res) {
    console.log("in get year method...")    
    var entityData = {
        Make_id : req.body.Make_id,
        Model_id : req.body.Model_id,
    };
    
    function getCarYear(req, entityData) {
        return new Promise(function (resolve, reject) {
            //query to get year on basis of make and model id        
            sqlQuery = "select distinct year_id as Year_Id, year from car_data  left join year on year.id = car_data.year_id where make_id = "+entityData.Make_id+" and model_id = "+entityData.Model_id+" order by year desc;" ;
            console.log(sqlQuery)
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'All the Years Based on Car Model'
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No year Avaliable for model'
                    });
                }
            })
        });
    }

    getCarYear(req, entityData).then(function (response) {
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