var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");
const { json } = require('express');
const sgMail = require('@sendgrid/mail')
var encrypt = require('../../utilities/encryption')
var decryptionFile = require('../../utilities/decryption')
var nodemailer = require('nodemailer');

exports.userSignup = function (req, res) {
      //fetching all the parameter
    var entityData = {
        Email: req.body.Email,
        Password : req.body.Password
    };

    var smtpConfig =  {
        service: 'smtp.gmail.com',
        host: 'smtp.gmail.com',
        port: 587,
        starttls: {
            enable: true
        },
        secureConnection: true,
        auth: {
            user: 'valuewings04@gmail.com',
            pass: '04#valuewings'
        }
    }
    var transporter = nodemailer.createTransport(smtpConfig);   
   
    
    //Validating Parameters
    function validateFields(req, res) {
        return new Promise(function (resolve, reject) {
            return resolve({
                status: HttpStatusCode.StatusCodes.OK,
                data: entityData
            });
        });
    }

    function userSignup(req, entityData) {
        return new Promise(function (resolve, reject) {
            //check wether the email already exist or not 
            let sqlQuery = "select email from user_detail where email = '"+entityData.Email+"';";
            dbConnection.getResult(sqlQuery).then(function(response){
                if(response.data.length>0){
                    //enters if user with emailId exists
                    return resolve({
                        status: 409,
                        data: response,
                        message: "User with this email is Already Exist..."
                    })
                }
                else{
                    //enter if there is no user with the given email id
                    //new user insertion
                    var email = decryptionFile(entityData.Email)
                    sqlQuery = "Insert into user_detail (email,password) values('" + entityData.Email + "','" + entityData.Password + "') returning id;";
                    dbConnection.getResult(sqlQuery).then(function (response) {
                        //Binding user information in to the variable and concatenating it with verification link
                        var tokenInfo = JSON.stringify({
                            Id: response.data[0].id,
                            Email: email,
                            Time: Date.now(),
                        });
                        var token = encrypt(tokenInfo);
                        console.log("Email is>>>>>>>>>>>>>>>>>")
                        console.log(email)
                        
                        //var token = jwt.sign(tokenInfo, settings.jwtConfig.secretKey);
                        
                        var link = " https://value-wings.herokuapp.com/api/user/signup/verify/"+token;
                        // const msg = {
                        //     to: email, 
                        //     from: 'valuewings04@gmail.com',
                        //     subject: 'Verification of SignUp',
                        //     text: 'Please confirm..',
                        //     html: "<div><h1>This is Confirmaion Link</h1> Click Here <a href="+link+ ">"+link+"</a></div> ",
                        //   }
                          //Sending Email
                        transporter.sendMail({
                                    from: 'valuewings04@gmail.com', // sender address
                                    to: email, //receipent address
                                    subject: 'Verification of SignUp',
                                    text:"Please confirm.."  ,
                                    html:'<center><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="95" alt="" data-proportionally-constrained="true" data-responsive="false" src="https://valuewings-car-image.s3.amazonaws.com/logo/ValueWings.png" height="33"></center><center><tbody><tr><td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 43px">Thanks for signing up to <span style="color: #636cff;"><strong>ValueWings</strong></span>&nbsp;</span></div><div></div></div></td></tr></tbody></center><center><tbody><tr><td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Please verify your email address to </span><span style="color: #000000; font-size: 18px; font-family: arial,helvetica,sans-serif">get fair value of your Dream Car</span><span style="font-size: 18px">.</span></div><div style="font-family: inherit; text-align: center"><span style="color: #636cff; font-size: 18px"><strong>Thank you!&nbsp;</strong></span></div><div></div></div></td></tr></tbody></center><center><td align="center" bgcolor="#636cff" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href='+link+' style="background-color:#636cff; border:1px solid #636cff; border-color:#636cff; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Verify Email Now</a></td></center>'
                                    // html: "<div><center><h1>Verification link for SignUp</h1><br/><a href="+link+ "><button style='color: #fff;background-color: #5cb85c;border-color: #4cae4c; padding: 20px 40px;'>Verify</button></a></div> ",

                            },function(err,reply){
                                if(err){
                                    console.error(error)
                                    console.log(error)
                                    sqlQuery="delete from user_detail where id = "+response.data[0].id+";";
                                    dbConnection.getResult(sqlQuery).then((response)=>{
                                        return resolve({
                                              status: 201,
                                              token: json.data,
                                              data: response,
                                              message: "Mail has been not sent..Please check your email address."
                                        });
                                    })
                                }
                                else{
                                        //If mail has been sent successfully then Insert token into user verification
                                        console.log('Email sent')
                                        sqlQuery = "insert into user_verification (user_id,token) values('" +  response.data[0].id + "', '" + token + "') returning id ;";
                                        console.log(sqlQuery);
                                        dbConnection.getResult(sqlQuery).then(function (response){
                                           console.log(response);
                                           console.log(response.data);
                                           return resolve({
                                               status: 200,
                                               token: json.data,
                                               data: response,
                                               message: "Mail has been sent..Please check your mail"
                                           });
                                           
                                       })
                                       .catch(function (error) {
                                           console.log("This is Running..")
                                           
                                       });
                           
                                }
                            });

                        //   sgMail
                        //         .send(msg)
                        //         .then(() => {
                        //                 //If mail has been sent successfully then Insert token into user verification
                        //                  console.log('Email sent')
                        //                  sqlQuery = "insert into user_verification (user_id,token) values('" +  response.data[0].id + "', '" + token + "') returning id ;";
                        //                  console.log(sqlQuery);
                        //                  dbConnection.getResult(sqlQuery).then(function (response){
                        //                     console.log(response);
                        //                     console.log(response.data);
                        //                     return resolve({
                        //                         status: 200,
                        //                         token: json.data,
                        //                         data: response,
                        //                         message: "Mail has been sent..Please check your mail"
                        //                     });
                                            
                        //                 })
                        //                 .catch(function (error) {
                        //                     console.log("This is Running..")
                                            
                        //                 });
                            
                        //         })
                        //         .catch((error) => {
                        //                 console.error(error)
                        //                 console.log(error)
                        //                 sqlQuery="delete from user_detail where id = "+response.data[0].id+";";
                        //                 dbConnection.getResult(sqlQuery).then((response)=>{
                        //                     return resolve({
                        //                           status: 201,
                        //                           token: json.data,
                        //                           data: response,
                        //                           message: "Mail has been not sent..Please check your email address."
                        //                     });
                        //                 })
                        //             })
             
                    })

                }
            })
            
        });
    }

    validateFields(req, res).then(function (response) {
        userSignup(req, response.data).then(function (response) {
            res.status(response.status).json({
                data: response.token,
                message: response.message
            });
        })
        .catch(function (error) {
            console.log("This is Running")
            res.status(HttpStatusCode.StatusCodes.BAD_REQUEST).json({
                data: error.data,
                message:"Wrong"
            });
        });
    })
    
    
}