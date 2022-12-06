var dbConnection = require('../../utilities/postgresql-connection.js');
var HttpStatusCode = require("http-status-codes");
const { json } = require('express');
const sgMail = require('@sendgrid/mail')
var nodemailer = require('nodemailer');

var encrypt = require('../../utilities/encryption')
var decrypt = require('../../utilities/decryption')


exports.getEmailForgotPassword = function (req, res) {
    console.log("in Function used for sending Email for Forgot Password...")
    //Fetching Veriable required for API 
    var entityData = {
        Email: req.body.Email,
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

    console.log(entityData.Email)
    // Entering API Key for Send Grid
        
    // Function for Sending Email for Forgot Password
    function getEmailForgotPassword(req, entityData) {
        return new Promise(function (resolve, reject) {
            console.log(entityData.Email)
            // Checkiing if ID is avaliable or not
            let sqlQuery = "select id from user_detail where email = '"+entityData.Email+"';";
            dbConnection.getResult(sqlQuery).then((response)=>{
                //checking if Email is Existing or not in DB
                if(response.data.length>0){
                    // Getting id from DB and Generating token for passing it with Verification link
                    var id = response.data[0].id;
                    
                    var tokenInfo =JSON.stringify({
                        Id: id,
                        Email: entityData.Email,
                        Time: Date.now(),
                    })
                    //Encode token 
                    var token = encrypt(tokenInfo);
                    //var token = jwt.sign(tokenInfo, settings.jwtConfig.secretKey);
                    var email = decrypt(entityData.Email)
                    
                    console.log("Main mail id to sent mail")
                    console.log(email)
                    console.log(token)
                    console.log(entityData.Email)
                    
                    var link = " https://value-wings.herokuapp.com/api/user/forgotPassword/verify/"+token;
                        //Generating message for Mail
                        // const msg = {
                        //     to: email, // Change to your recipient
                        //     from: 'valuewings04@gmail.com', // Change to your verified sender
                        //     subject: 'Verification of ForgotPassword',
                        //     text: 'Please confirm..',
                        //     html: "<div><h1>This is Confirmaion Link</h1> Click Here <a href="+link+ ">"+link+"</a></div> ",
                        //   }
                          transporter.sendMail({
                                 from: 'valuewings04@gmail.com', // sender address
                                 to: email, //receipent address
                                 subject: 'Verification of ForgotPassword',
                                 text:"Please confirm.."  ,
                                 html:'<center><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="95" alt="" data-proportionally-constrained="true" data-responsive="false" src="https://valuewings-car-image.s3.amazonaws.com/logo/ValueWings.png" height="33"></center><center><tbody><tr><td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 43px">Password Reset&nbsp;</span></div><div></div></div></td></tr></tbody></center><center><tbody><tr><td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Seems like you forgot your password for <span style="color: #636cff;"><strong>ValueWings</strong></span>, If this is true click below to reset your password. </span><span style="color: #000000; font-size: 18px; font-family: arial,helvetica,sans-serif"></span><span style="font-size: 18px"></span></div><div style="font-family: inherit; text-align: center"></div><div></div></div></td></tr><br><br></tbody></center><center><td align="center" bgcolor="#636cff" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href='+link+' style="background-color:#636cff; border:1px solid #636cff; border-color:#636cff; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Reset My Password</a></td></center>'
                                //  html: "<div><center><h1>Verification link for Forgot Password</h1><br/><a href="+link+ "><button style='color: #fff;background-color: #5cb85c;border-color: #4cae4c;padding: 20px 40px;'>Verify</button></a></div> ",

                          },function(err,reply){
                              if(err){
                                return resolve({
                                    status: 201,
                                    token: json.data,
                                    data: response,
                                    message: "Mail has been not sent..Please check your email address."
                                });
                              }
                              else{
                                console.log('Email sent')
                                sqlQuery = "insert into user_verification (user_id,fp_token) values(" + id + ", '" + token + "') returning id ;";
                                console.log(sqlQuery);
                                dbConnection.getResult(sqlQuery).then(function (response){
                                    console.log(response);
                                    console.log(response.data);
                                    if(response.data.length > 0){
                                        
                                        return resolve({
                                            status: 200,
                                            token: json.data,
                                            data: response,
                                            message: "Mail Has Been Sent Please Check Your Mail"
                                        });
                                        
                                    }
                                    else{
                                        //If mail has not been send Give response
                                        console.log("If condition is false")

                                        return resolve({
                                            status: 201,
                                            token: json.data,
                                            data: response,
                                            message: "Mail Has Been Sent Please Check Your Mail"
                                        });
                                    }
                                
                                 }).catch(function (error) {
                                        console.log(error)
                                
                                    });
                             }
                          });

                          //Sending mail
                        // sgMail
                        //     .send(msg)
                        //     .then(() => {
                        //             // If mail has been sent then Insert the token into the user_verification table and give response
                        //             console.log('Email sent')
                        //             sqlQuery = "insert into user_verification (user_id,fp_token) values(" + id + ", '" + token + "') returning id ;";
                        //             console.log(sqlQuery);
                        //             dbConnection.getResult(sqlQuery).then(function (response){
                        //             console.log(response);
                        //             console.log(response.data);
                        //             if(response.data.length > 0){
                                        
                        //                 return resolve({
                        //                     status: 200,
                        //                     token: json.data,
                        //                     data: response,
                        //                     message: "Mail Has Been Sent Please Check Your Mail"
                        //                 });
                                        
                        //             }
                        //             else{
                        //                 //If mail has not been send Give response
                        //                 console.log("If condition is false")

                        //                 return resolve({
                        //                     status: 201,
                        //                     token: json.data,
                        //                     data: response,
                        //                     message: "Mail Has Been Sent Please Check Your Mail"
                        //                 });
                        //             }
                                    
                        //         })
                        //         .catch(function (error) {
                        //             console.log(error)
                                    
                        //         });
                                
                        //     })
                        //     .catch((error) => {
                        //         return resolve({
                        //             status: 201,
                        //             token: json.data,
                        //             data: response,
                        //             message: "Mail has been not sent..Please check your email address."
                        //         });
                        //         console.log(error);
                        //     })
                      
                }
                else{
                    console.log("Email doesnot exist in Database")
                    return resolve({
                        status: 401,
                        data: response,
                        message: 'User with This Email doesnot Exist',
                    })
                }
            })
            
        });
    }

    getEmailForgotPassword(req, entityData).then(function (response) {
        res.status(response.status).json({
            data: response.token,
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