var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");
const jwt_decode = require('jwt-decode');
var generatePrice = require('../../utilities/generate-price');
var file1 = require('../../utilities/encryption');
var file2 = require('../../utilities/decryption');

exports.getCarPrice = function (req, res) {
    
    var entityData = {
        Make_id : req.body.Make_id,
        Model_id : req.body.Model_id,
        Year_id : req.body.Year_id,
        Trim_id : req.body.Trim_id,
        kms : req.body.kms,
        token: req.body.token,
        month: req.body.Month_id
    };
    console.log("in get price method..."); 

    function getCarPrice(req, entityData) {
        return new Promise(function (resolve, reject) {
            //fetching year on base of its id for year_difference
            sqlQuery="select year from year where id = "+entityData.Year_id+";";
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    var year = response.data[0].year;
                }
                // to get the difference of year frm current year(2021) and user selected 
                var current_date = new Date();
                var current_month = current_date.getMonth()+1;
                console.log("current month");
                console.log(current_month)
                var month_diff = current_month - entityData.month;
                console.log("month_diiifeeerrence");
                console.log(month_diff)
                var current_year = current_date.getFullYear();
                var year_diff = current_year - year;
                console.log("year_diiifeeerrence");
                console.log(year_diff)
                if(month_diff < 0)
                {
                    console.log(" year - 1 ");
                    year_diff = year_diff-1;
                    console.log(year_diff)
                }
                else{
                    console.log(" year as it is");
                    console.log(year_diff)
                }
                
                //selecting all car details of the user selected car and its original price
                sqlQuery = "select car_data.id,car_data.original_price, make.make_name, model.model_name,model.image_path, year.year, trim.trim_name from make left join car_data on car_data.make_id = make.id left join model on model.id = car_data.model_id left join trim on trim.id = car_data.trim_id left join year on year.id = car_data.year_id where car_data.make_id = "+entityData.Make_id+"  and car_data.model_id = "+entityData.Model_id+"  and car_data.trim_id = "+entityData.Trim_id+";";
                console.log("All Selected Car detail and original price fetch query...");
                console.log(sqlQuery)
                dbConnection.getResult(sqlQuery).then((response)=>{
                    if(response.data.length>0){
                        var price = response.data[0].original_price;
                        var car_id = response.data[0].id;

                        console.log("Original Price of Selected Car");
                        console.log(price)
                        console.log("CarId of selected car");
                        console.log(car_id)

                        // array of data to pass in the function to generatePrice
                        var all_data = {
                            year : year_diff,
                            km : entityData.kms,
                            original_price : price,
                        };
                        // call of a function to generatePrice
                        var json =  generatePrice(all_data) ;
                        console.log(json.data);

                        //array of all the details to return from function
                        var car_details = {
                            "car_make": response.data[0].make_name,
                            "car_model": response.data[0].model_name,
                            "car_image": response.data[0].image_path,
                            "car_trim": response.data[0].trim_name,
                            "car_year": response.data[0].year,
                            "car_price":json.data,
                            
                        }
                        //stringify json response of price got fro the function.
                        var car_price = JSON.stringify(json.data);
                        console.log("JSON car price response.....")
                        console.log(car_price)
                        console.log(entityData.token);
                        // token decode to add the search car details to the history table
                        var decode = JSON.parse(file2(entityData.token));
                        var id = decode.Id;

                        //query to insert the car search to history table
                        sqlQuery = "insert into history (cardata_id, kilometer, user_id, estimated_price) values (" +car_id+ ", " +entityData.kms+ ","+id+", '" + car_price + "');";
                        dbConnection.getResult(sqlQuery).then((response)=>{
                                return resolve({
                                    status: 200,
                                    data: car_details,
                                    message: 'Succesfully got the all the selected car details, original price and saved  as history...'
                                });
                        })
                        
                    }
                    else{
                        return resolve({
                            status: 200,
                            data: response,
                            message: 'No original price is available in the data for that car'
                        });
                    }
                })
            })
        });
    }

    getCarPrice(req, entityData).then(function (response) {
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