var express = require("express");

var router = express.Router({
  caseSensitive: true,
});
var ensureToken = require('../utilities/ensure-token');


/**
 *  Get All Users
 */
var getAllUsersCtrl = require('../controllers/user_management/get_all_user.js');
router.get("/getAllProfile", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getAllUsersCtrl.getAllUsers(req, res);
});

/**
 *  Get User By Id
 */
var getUserByIdCtrl = require("../controllers/user_management/get_user_by_id");
const { route } = require(".");
router.get("/getProfile/:id", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getUserByIdCtrl.getUserById(req, res);
});


/**
 *  User Login
 */
var userLoginCtrl = require('../controllers/user_management/login.js');
router.post("/login", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return userLoginCtrl.userLogin(req, res);
});

/**
 * User Signup
 */
var userSignupCtrl = require('../controllers/user_management/signup.js');
router.post("/signup", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return userSignupCtrl.userSignup(req, res);
});

/**
 *  Verify User by Token Through Email
 */
var verifyUserIdCtrl = require("../controllers/user_management/verifyUser");
router.get("/signup/verify/:token", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return verifyUserIdCtrl.userVerify(req, res);
});

/**
 *  User Update
 */
var userUpdateCtrl = require("../controllers/user_management/update");
router.put("/updateProfile/:id", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  return userUpdateCtrl.userUpdate(req, res);
});

/**
 * Change Password
 */
var userChangePasswordctrl = require("../controllers/user_management/changePassword");
router.put("/changePassword/:id", function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return userChangePasswordctrl.userChangePassword(req,res);
})

/**
 * Forgot Password
 */
var userForgotPasswordctrl = require("../controllers/user_management/forgotPassword");
router.put("/forgotPassword", function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return userForgotPasswordctrl.userForgotPassword(req,res);
})

/**
 * Forgot Password Mail Sent to User
 */
var getEmailForgotPasswordCtrl = require("../controllers/user_management/emailForgotPassword");
router.post("/emailForgotPassword",function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getEmailForgotPasswordCtrl.getEmailForgotPassword(req,res);
})

/**
 * Verify Forgot Password Link and Update the Password if User is Verified
 */
 var verifyLinkForForgotPasswordCtrl = require("../controllers/user_management/verifyLinkForgotPassword");
 router.get("/forgotPassword/verify/:token",function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   return verifyLinkForForgotPasswordCtrl.verifyLinkForForgotPassword(req,res);
 })




module.exports = router;