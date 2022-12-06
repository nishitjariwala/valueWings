var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getHistory = function (req, res) {
    console.log("in get make method...")
    var entityData = {
        
    };
    
    

    function getHistory(req, entityData) {
        return new Promise(function (resolve, reject) {
            let sqlQuery = "select max(year),min(year) from year left join car_data cd on cd.year_id = year.id where cd.make_id= 1 and cd.model_id=2;";
            dbConnection.getResult(sqlQuery).then(function(response){
                
            }) 
        });
    }

    getHistory(req, entityData).then(function (response) {
        console.log("Error while calling main function..")
        res.status(response.status).json({
            data: response.data,
            message: response.message
        });
    })
    .catch(function (error) {
        console.log("Catch called while calling main function....")
        res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
            data: error.data,
            message:"wrong...."
        });
    });


    
    
}