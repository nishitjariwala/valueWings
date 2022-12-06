var dbConnection = require('../../utilities/postgresql-connection.js');
var validate = require('validator');
var HttpStatusCode = require("http-status-codes");
const jwt_decode = require('jwt-decode');
var encryption = require('../../utilities/encryption');
var decryptionFile = require('../../utilities/decryption')
var file2 


exports.getCarCertificate = function (req, res) {

    console.log("in get certificate method")
    var entityData = {
        Make_id : req.body.Make_id,
        Model_id : req.body.Model_id,
        Year_id : req.body.Year_id,
        Trim_id : req.body.Trim_id,
        User_token: req.body.User_token,
        price: req.body.Price
    };
    var model_name;
    var make_name;
    var trim_name;
    var year;
    var f_name;
    var l_name;
    var city;
    var email;
    var price = entityData.price;

    function getCarCertificate(req, entityData) {
        return new Promise(function (resolve, reject) {
            //queries to fetch all the data to provide in certificate
            //query to fetch model
            let sqlQuery = "select model_name from model where id = "+entityData.Model_id+" ;" ;
            console.log("Getting Model")
            console.log(sqlQuery)
            dbConnection.getResult(sqlQuery).then((response)=>{
                if(response.data.length>0){
                    model_name = response.data[0].model_name;
                    //query to fetch make
                    sqlQuery = "select make_name from make where id = "+entityData.Make_id+" ;" ;
                    console.log("Getting Make")
                    console.log(sqlQuery)
                    dbConnection.getResult(sqlQuery).then((response)=>{
                        if(response.data.length>0){
                            make_name = response.data[0].make_name;
                            //query to fetch year
                            sqlQuery = "select year from year where id = "+entityData.Year_id+" ;" ;
                            console.log("Getting Year")
                            console.log(sqlQuery)
                            dbConnection.getResult(sqlQuery).then((response)=>{
                                if(response.data.length>0){
                                    year = response.data[0].year;
                                    //query to fetch trim
                                    sqlQuery = "select trim_name from trim where id = "+entityData.Trim_id+" ;" ;
                                    console.log("Getting Trim.....")
                                    console.log(sqlQuery)
                                    dbConnection.getResult(sqlQuery).then((response)=>{
                                        console.log("All Query run successfully...")
                                        if(response.data.length>0){
                                            trim_name = response.data[0].trim_name;
                                            //token decoding to get all the details of user for certificate
                                            // decodin token
                                            console.log(entityData.User_token)
                                            var decode = JSON.parse(decryptionFile(entityData.User_token));
                                            var user_id = decode.Id;
                                            console.log(user_id)
                                            //query to fetch all user detail through id..
                                            sqlQuery = "select * from user_detail where id = "+user_id+" ;" ;
                                            console.log("Getting User")
                                            console.log(sqlQuery)
                                            dbConnection.getResult(sqlQuery).then((response)=>{
                                                if(response.data.length>0){
                                                    email= decryptionFile(response.data[0].email),
                                                    city =  response.data[0].city==null?null:decryptionFile(response.data[0].city)
                                                    phone_no = response.data[0].phone_no==null?null:decryptionFile(response.data[0].phone_no)
                                                    f_name= response.data[0].f_name==null?null:decryptionFile(response.data[0].f_name)
                                                    l_name=response.data[0].l_name==null?null:decryptionFile(response.data[0].l_name)
                                                    
                                                    // all the data to pass to generate certificate..
                                                    var certificate_data = {
                                                        "f_name": f_name,
                                                        "l_name": l_name,
                                                        "city" : city,
                                                        "email": email,
                                                        "phone_no": phone_no,
                                                        "make_name": make_name, 
                                                        "model_name": model_name,
                                                        "trim_name": trim_name, 
                                                        "year": year,
                                                        "price": price
                                                    }
                                                    var certificate_details = encryption(JSON.stringify(certificate_data))

                                                    console.log("Data to add in Cerificate... ");
                                                    console.log(certificate_data);
                                                    return resolve({
                                                        status: 200,
                                                        data: {
                                                            "data": certificate_details
                                                        },
                                                        message: 'This  is Data.......'
                                                    });
                                                }
                                            })
                                        }
                                        else{
                                            console.log("Outside Connection")
                                        }
                                    })
                                    
                                }
                            })
                        }
                    })

                }
            })
        });
    }

    getCarCertificate(req, entityData).then(function (response) {
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
            message:"wrong..."
        });
    });


    
    
}