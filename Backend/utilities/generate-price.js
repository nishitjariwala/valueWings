var HttpStatusCode = require("http-status-codes");

 function getPrice(original_price, depriciation){
    let price;
    price = Math.round(((100-depriciation)*original_price)/100)
    return price
  }

generatePrice = function (car_data) {
    var cardata = {
        year : car_data.year,
        km : car_data.km,
        original_price : car_data.original_price,
    };

    let init_depriciation = 10
    let depriciation; 
    if(cardata.year==0){
      depriciation=0
    }
    else if(cardata.km<=12000){
      if(cardata.year==1){
        depriciation=15
      }
      else if(cardata.year==2){
        depriciation=20
      }
      else{
        depriciation=25
      }
    }
    else if(cardata.km<=25000){
      if(cardata.year==1){
        depriciation=20
      }
      else if(cardata.year==2){
        depriciation=25
      }
      else if(cardata.year==3){
        depriciation=30
      }
      else if(cardata.year==4){
        depriciation=30
      }
      else{
        depriciation=35
      }
    }
    else if(cardata.km<=35000){
      if(cardata.year==1){
        depriciation=20
      }
      else if(cardata.year==2){
        depriciation=25
      }
      else if(cardata.year==3){
        depriciation=35
      }
      else if(cardata.year==4){
        depriciation=35
      }
      else{
        depriciation=40
      }
    }
    else if(cardata.km<=50000){
      if(cardata.year==1){
        depriciation=25
      }
      else if(cardata.year==2){
        depriciation=30
      }
      else if(cardata.year==3){
        depriciation=35
      }
      else if(cardata.year==4){
        depriciation=45
      }
      else{
        depriciation=50
      }
    }
    else{
      if(cardata.year==1){
        depriciation=25
      }
      else if(cardata.year==2){
        depriciation=30
      }
      else if(cardata.year==3){
        depriciation=35
      }
      else if(cardata.year==4){
        depriciation=45
      }
      else if(cardata.year== 5){
        depriciation=50
      }
      else{
        depriciation= 60
      }
    }
    let total_depriciation = depriciation+ init_depriciation;
    let min_depriciarion;
    let max_depriciation;
  
    min_depriciarion = total_depriciation-10;
    max_depriciation = total_depriciation-5;
    let very_good_max_price = getPrice(cardata.original_price,min_depriciarion)
    let very_good_min_price = getPrice(cardata.original_price,max_depriciation)
  
    min_depriciarion = total_depriciation-5;
    max_depriciation = total_depriciation;
    let good_max_price = getPrice(cardata.original_price,min_depriciarion)
    let good_min_price = getPrice(cardata.original_price,max_depriciation)
  
  
    min_depriciarion = total_depriciation;
    max_depriciation = total_depriciation + 5;
    let bad_max_price = getPrice(cardata.original_price,min_depriciarion)
    let bad_min_price = getPrice(cardata.original_price,max_depriciation)
  
  
    min_depriciarion = total_depriciation + 5;
    max_depriciation = total_depriciation + 10;
    let very_bad_max_price = getPrice(cardata.original_price,min_depriciarion)
    let very_bad_min_price = getPrice(cardata.original_price,max_depriciation)
  
  
    console.log(total_depriciation)
    var token = {
      "very_good": {
        "min_price": very_good_min_price,
        "max_price": very_good_max_price
      },
      "good": {
        "min_price": good_min_price,
        "max_price": good_max_price
      },
      "bad": {
        "min_price": bad_min_price,
        "max_price": bad_max_price
      },
      "very_bad": {
        "min_price": very_bad_min_price,
        "max_price": very_bad_max_price
      },
    };

    console.log("Userrrrrr Infoooooo");
    console.log(cardata);
    // var token = {
    //         very_bad : '15-20',
    //         bad : '10-15',
    //         good : '05-10',
    //         very_good : '00-05',
    // };
    console.log("Tookeeennnn");
    console.log(token);
    return {
          data: token
    };
}

module.exports = generatePrice;