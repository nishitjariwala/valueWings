var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");

exports.getCarImages = function (req, res) {
    console.log("in get model method..")    
    var entityData = {
        Model_id : req.body.Model_id,
    };
    
    function getCarImages(req, entityData) {
        return new Promise(function (resolve, reject) {
            //query to fetch model on basis of make id        
            sqlQuery = "select  distinct m.id, jsonb_agg(distinct a) as degreeImages, jsonb_agg(distinct b) as interior , jsonb_agg(distinct c) as exterior	from model m join(select * from car_360images ci )a on a.model_id = m.id join(select * from car_interior_images cii )b on b.model_id = m.id	join(select * from car_exterior_images cei )c on c.model_id = m.id	group by m.id having m.id = "+entityData.Model_id+ ";" ;
            console.log(sqlQuery)
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response.data,
                        message: 'All the images based on ModelId'
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No images Avaliable for model_id'
                    });
                }
            })
        });
    }

    getCarImages(req, entityData).then(function (response) {
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