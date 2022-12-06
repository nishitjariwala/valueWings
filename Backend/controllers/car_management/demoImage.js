var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");
//filepath = require('https://value-wings.herokuapp.com/app/public/images')
//filepath = require('../../public/images/')
var path = require('path');
exports.demoImage = function (req, res) {
    console.log("in get new car data method....")
    var entityData = {
        month : req.body.month,
        year : req.body.year,
    };
    
    



    function demoImage(req, entityData) {
        return new Promise(function (resolve, reject) {
            //query to fetch trim on base of make_id, model_id and year_id
            sqlQuery = "select * from model m2;";
            dbConnection.getResult(sqlQuery).then((response)=>{
                console.log(response)
            
                //console.log(filepath)
               
              
                console.log("https://value-wings.herokuapp.com/" + JSON.stringify(response.data))
                //file =  sharp(path.resolve(__dirname, '../images/image.png'))
                if(response.data.length>0){
                    return resolve({
                        status: 200,
                        data: response.data,
                        message: 'Image Found '
                    })
                }
                else{
                    return resolve({
                        status: 200,
                        data: response,
                        message: 'No image found.'
                    });
                }
            })
        });
    }

    demoImage(req, entityData).then(function (response) {
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