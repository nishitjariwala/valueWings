var jwt = require('jsonwebtoken');
var HttpStatusCode = require("http-status-codes");
var settings = require('../config.js');


generateToken = function (payload) {
    var userInfo = {
        Id: payload.id,
        Email: payload.email,
        Var: "Hello"
    };
    var token = jwt.sign(userInfo, "valuewings04#");
    return {
        status: HttpStatusCode.StatusCodes.OK,
        data: 'Bearer ' + token
    };
}

module.exports = generateToken;