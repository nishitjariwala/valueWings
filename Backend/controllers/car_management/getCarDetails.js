var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getCarDetails = function (req, res) {
    console.log("in get make method...")
    var entityData = {
        make : req.body.make,
        model : req.body.model,
    };

    var min_price;
    var max_price;
    var model;
    var make;
    var image;
    function getCarDetails(req, entityData) {
        return new Promise(function (resolve, reject) {
            sqlQuery = "select distinct make_name,image_path, model_name, min(cd.original_price),max(cd.original_price) from car_data cd  inner join make  on make.id = cd.make_id left join model  on model.id = cd.model_id  where  make_id= "+entityData.make+" and model_id="+entityData.model+"group by make.make_name, model.model_name, model.image_path ;";
                dbConnection.getResult(sqlQuery).then(function(response){
                    min_price=response.data[0].min;
                    max_price=response.data[0].max;
                    model = response.data[0].model_name;
                    make = response.data[0].make_name;
                    image = response.data[0].image_path
                    sqlQuery = "select * from car_detail where  model_id="+entityData.model+";";
                    dbConnection.getResult(sqlQuery).then(function(response){
                        
                        var height= response.data[0].height
                        var width= response.data[0].width
                        var length= response.data[0].length
                        var wheelbase= response.data[0].wheelbase
                        var ground_clearance= response.data[0].ground_clearance
                        var doors= response.data[0].doors
                        var seating_rows= response.data[0].seating_rows
                        var bootspace= response.data[0].bootspace
                        var fuel_tank_capacity=response.data[0].fuel_tank_capacity
                        var front_suspension= response.data[0].front_suspension
                        var rear_suspension= response.data[0].rear_suspension
                        var front_break_type= response.data[0].front_break_type
                        var rear_break_type= response.data[0].rear_break_type
                        var minimum_turning_radious= response.data[0].minimum_turning_radious
                        var steering_type= response.data[0].steering_type
                        var wheels= response.data[0].wheels
                        var spare_wheels= response.data[0].spare_wheels
                        var front_tyers= response.data[0].front_tyers
                        var rear_tyers= response.data[0].rear_tyers
                        var airbags= response.data[0].airbags
                        var child_seat_anchor_points= response.data[0].child_seat_anchor_points
                        var seat_belt_warning= response.data[0].seat_belt_warning
                        return resolve({
                            status: 200,
                            data: {
                                "max_price": max_price,
                                "min_price": min_price,
                                "make": make,
                                "model": model,
                                "image_path": image,
                                "height": height,
                                "width": width,
                                "length": length,
                                "wheelbase": wheelbase,
                                "ground_clearance": ground_clearance,
                                "doors": doors,
                                "seating_rows": seating_rows,
                                "bootspace": bootspace,
                                "fuel_tank_capacity": fuel_tank_capacity,
                                "front_suspension": front_suspension,
                                "rear_suspension": rear_suspension,
                                "front_break_type": front_break_type,
                                "rear_break_type": rear_break_type,
                                "minimum_turning_radious": minimum_turning_radious,
                                "steering_type": steering_type,
                                "wheels": wheels,
                                "spare_wheels": spare_wheels,
                                "front_tyers": front_tyers,
                                "rear_tyers": rear_tyers,
                                "airbags": airbags,
                                "child_seat_anchor_points": child_seat_anchor_points,
                                "seat_belt_warning": seat_belt_warning
                            },
                            message: 'Get Car Details'
                        });
                    })

                    
                
            }) 
        });
    }

    getCarDetails(req, entityData).then(function (response) {
        console.log("Error while calling main function...")
        res.status(response.status).json({
            data: response.data,
            message: response.message
        });
    })
    .catch(function (error) {
        console.log("Catch called while calling main function......")
        res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
            data: error.data,
            message:"wrong"
        });
    });   
}