const { Pool } = require('pg')
var HttpStatusCode = require("http-status-codes");

var settings = require("../config.js");

async function getResult(sqlQuery) {
  var res = await getResultArray(sqlQuery) // a is 5
  return res;
}

async function getResultArray(sqlQuery){ 
  return new Promise(function (resolve, reject) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    
    //console.log(pool);heroku 
        
    return pool.query(sqlQuery, (err, result) => { 
      console.log("In Connection file and result uis ????>>>>>>>>>>")
      // console.log(result);
      if(err){
        console.log("Erorr......");
        console.log(err);
      }
      if (result.rows.length > 0) {
        return resolve({
          status: HttpStatusCode.StatusCodes.OK,
          data: result.rows
        });
      } else { 
        return resolve({
          status: HttpStatusCode.StatusCodes.OK,
          data: []
        });
      }        
    })

  });
  
}

module.exports = {
  getResult
}