var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.compareCars = function (req, res) {
    console.log("in get make method...")
    var entityData = {
        make : req.body.make,
        model : req.body.model,
    };
    var init_year;
    var last_year;
    var min_price;
    var max_price;
    var trims;
    var price;
    

    function compareCars(req, entityData) {
        return new Promise(function (resolve, reject) {
            let sqlQuery = "select max(year),min(year) from year left join car_data cd on cd.year_id = year.id where cd.make_id= 1 and cd.model_id=2;";
            dbConnection.getResult(sqlQuery).then(function(response){
                init_year=response.data[0].min;
                last_year=response.data[0].max;
                sqlQuery = "select min(cd.original_price),max(cd.original_price) from car_data cd where  cd.make_id= 1 and cd.model_id=2;";
                dbConnection.getResult(sqlQuery).then(function(response){
                    min_price=response.data[0].min;
                    max_price=response.data[0].max;
                    sqlQuery = "select t.trim_name from car_data cd left join trim t on t.id = cd.trim_id where  cd.make_id= 1 and cd.model_id=2 group by t.trim_name;";
                    dbConnection.getResult(sqlQuery).then(function(response){
                        trims=response.data;
                        console.log(response.data)
                        sqlQuery = "select cd.original_price,t.trim_name from car_data cd left join trim t on t.id = cd.trim_id where  cd.make_id= 1 and cd.model_id=2 group by t.trim_name, cd.original_price;";
                        dbConnection.getResult(sqlQuery).then(function(response){
                            price=response.data;
                            console.log(response.data)
                            var car_data = {
                                "init_year": init_year,
                                "last_year": last_year,
                                "min_price": min_price,
                                "max_price": max_price,
                                "trims": trims,
                                "price": price,
                            }
                            console.log(car_data)
                            return resolve({
                                status: 200,
                                data: car_data,
                                message: 'Successfully received car data'
                            });
                            
                        })  
                    })
                })
            }) 
        });
    }

    compareCars(req, entityData).then(function (response) {
        console.log("Error while calling main function...")
        res.status(response.status).json({
            data: response.data,
            message: response.message
        });
    })
    .catch(function (error) {
        console.log("Catch called while calling main function....")
        res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
            data: error.data,
            message:"wrong"
        });
    });


    
    
}