var express = require("express");
const feed = require("feed-read");
const { json } = require("express");
var file1 = require('../utilities/encryption')
var file2 = require('../utilities/decryption')
var nodemailer = require('nodemailer');

var router = express.Router({
  caseSensitive: true,
});
// var urls =  "https://www.carandbike.com/rss/newsrss";
//var urls="https://rss.app/feeds/eBcYV6qkCZsLOinl";
// var urls = "https://rss.app/feeds/bwm3TEN70mPsiHa3";
//var urls="http://feeds.highgearmedia.com/?sites=TheCarConnection&tags=acura";
//var urls="https://rss.app/feeds/ij1aLgTTEuag5X3a";
//working do
//var urls = "https://rss.app/feeds/1nz4bs55nanhStW6";
/***/
router.get("/fetchCarNews", function (req, response) {
     feed(urls, function(err, news) {
        response.json(news)
    })
});

router.get("/email", function (req, response) {
  var current_date = new Date();
  var current_month = current_date.getMonth()+1;
        console.log("current month");
        console.log(current_month)
  var month_diff = current_month - 12;
        console.log("month_diiifeeerrence");
        console.log(month_diff)
  var current_year = current_date.getFullYear();
  var year_diff = current_year - 2018;
        console.log("year_diiifeeerrence");
        console.log(year_diff)

if(month_diff < 0)
{
console.log(" year == 0");
year_diff = year_diff-1;
console.log(year_diff)
}
else{

console.log(" year == 1");
console.log(year_diff)
}
  
  response.json("Done")
 
  });
module.exports = router;