var express = require("express");
var router = express.Router({
  caseSensitive: true,
});
var cors = require('cors')
var whitelist = ['https://valuewings-fe.herokuapp.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } 
    else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


/**
 *  Get Make
 * router.get("/getMake", cors(corsOptions),  function (req, res) {
 */
var getCarMakeCtrl = require('../controllers/car_management/getMake');
router.get("/getMake",  function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getCarMakeCtrl.getCarMake(req, res);
});

/**
 *  Get Model
 */
var getCarModelCtrl = require('../controllers/car_management/getModel');
router.post("/getModel", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getCarModelCtrl.getCarModel(req, res);
});


/**
 *  Get Year
 */
var getCarYearCtrl = require('../controllers/car_management/getYear');
router.post("/getYear", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getCarYearCtrl.getCarYear(req, res);
});

/**
 *  Get Trim
 */
var getCarTrimCtrl = require('../controllers/car_management/getTrim');
router.post("/getTrim", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getCarTrimCtrl.getCarTrim(req, res);
});

/**
 *  Get Car Price and save History
 */

var getCarPriceCtrl = require('../controllers/car_management/getCarPrice');
router.post("/getCarPrice", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getCarPriceCtrl.getCarPrice(req, res);
});


/**
 *  Get Car Selling Certificate
 */

var getCarCertificateCtrl = require('../controllers/car_management/getCertificate');
router.post("/getCarCertificate", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getCarCertificateCtrl.getCarCertificate(req, res);
});

/**
 *  Get new car data
 */

var getNewCarDataCtrl = require('../controllers/car_management/getNewCarData');
router.post("/getNewCarData", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getNewCarDataCtrl.getNewCarData(req, res);
});

/**
 *  Get all car data
 */

var getAllCarDataCtrl = require('../controllers/car_management/getAllCarData');
router.get("/getAllCarData", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getAllCarDataCtrl.getAllCarData(req, res);
});


/**
 *  Get car data for comparision
 */

var compareCarsCtrl = require('../controllers/car_management/compareCars');
router.post("/compareCar", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return compareCarsCtrl.compareCars(req, res);
});

/**
 *  Get car Details for Comparision
 */

var compareCarsCtrl = require('../controllers/car_management/getCarDetails');
router.post("/getCarDetails", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return compareCarsCtrl.getCarDetails(req, res);
});

/**
 * image demo
 */

var getCarImageCtrl = require('../controllers/car_management/getCarImages');
router.post("/carImage", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getCarImageCtrl.getCarImages(req, res);
});

/**
 * Get All Car Trim Price
 */

var getAllCarTrimPriceCtrl = require('../controllers/car_management/getAllCarTrimPrice');
router.post("/getAllCarTrimPrice", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return getAllCarTrimPriceCtrl.getAllCarTrimPrice(req, res);
});

module.exports = router ;