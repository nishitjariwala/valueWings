var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getNewCarData = function (req, res) {
    console.log("in get new car data method.......")
    var entityData = {
        Make_id : req.body.Make_id,
        Model_id : req.body.Model_id,
        
    };
    
    function getNewCarData(req, entityData) {
        return new Promise(function (resolve, reject) {
            //query to fetch trim on base of make_id, model_id and year_id
            sqlQuery = "select make_name,model_name,image_path,jsonb_agg(a) as trims from car_data cd left join make m on cd.make_id = m.id left join model m2 on cd.model_id = m2.id  join( select trim_name, original_price from trim t2  inner join car_data cd2 on cd2.trim_id = t2.id ) a on cd.original_price = a.original_price where make_id = "+entityData.Make_id+" and model_id = "+entityData.Model_id+" group by make_name,model_name,image_path;" ;
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'All the Trim and original price based on Car Make and Model '
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No trim Avaliable for the given make and model.'
                    });
                }
            })
        });
    }

    getNewCarData(req, entityData).then(function (response) {
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