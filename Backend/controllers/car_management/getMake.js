var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getCarMake = function (req, res) {
    console.log("in get make method...")
    var entityData = {};
    

    function getCarMake(req, entityData) {
        return new Promise(function (resolve, reject) {
                
        console.log("Host Header")
        console.log(req.headers.host)

            // query to fetch all the make 
            sqlQuery = "select id as Make_ID, make_name from make order by make_name ;" ;
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'All the make with Id'
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No make Avaliable'
                    });
                }
            })
        });
    }

    getCarMake(req, entityData).then(function (response) {
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