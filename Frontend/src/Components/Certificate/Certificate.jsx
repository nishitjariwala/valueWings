import React, { Component } from "react";
import "./certificate.scss";
import logo from "../../Images/logoSquare.png";
import QR from "../../Images/QR.png";
import { decrypt } from "../../Shared/Decryption";
import { convert } from "../../Shared/INRConvert";

export default class Certificate extends Component {
  constructor(props) {
    super(props);
    let temp = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.state = {
      random: Math.floor(Math.random() * 1000),
      created_date:
        temp.getDate() +
        " " +
        monthNames[temp.getMonth()] +
        " " +
        temp.getFullYear(),
      fetchedData: {
        city: '',
        email: '',
        f_name: '',
        l_name: '',
        make_name: '',
        model_name: '',
        phone_no: '',
        price: '',
        trim_name: '',
        year: ''
      }
    };
  }
  componentDidMount(){
 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();

      urlencoded.append("Make_id", this.props.carDetails.make);
      urlencoded.append("Model_id", this.props.carDetails.model);
      urlencoded.append("Year_id", this.props.carDetails.year);
      urlencoded.append("Trim_id", this.props.carDetails.trim);
      urlencoded.append("User_token", this.props.user);
      urlencoded.append("Price", this.props.data.car_price);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://value-wings.herokuapp.com/api/cars/getCarCertificate", requestOptions)
    .then(response => response.json())
    .then(response => response.data)
    .then(response => JSON.parse(decrypt(response.data)))
    .then(fetchedData => {console.log(fetchedData);this.setState({fetchedData})});
  }
  render() {
    
    return (
   
      <div id="invoice" className="invoice-box">
        {/* <div className="line"></div> */}
        <table cellSpacing="0" cellPadding="0">
          <tr className="top">
            <td colSpan="2">
              <div className="certificate-title" style={{color:"#636cff"}}>ValueWings</div>
            </td>
          </tr>

          <tr className="information">
            <td colspan="2">
              <div>
                <div className="col-sm-12 row">
                  <div className="col-sm-6 pl-4">
                    <br/>
                    {this.state.fetchedData.f_name} {this.state.fetchedData.l_name}
                    <br />
                    {this.state.fetchedData.email}
                    <br />
                    {this.state.fetchedData.city}
                  </div>
                  <div className="col-sm-6 pl-3">
                  <img src={this.props.data.car_image} className="img-fluid float-right"/>
                    
                    <br />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </table>
        <table>
          <tr className="heading">
            <td>Car Details</td>

            <td></td>
          </tr>

          <tr className="item">
            <td>Make</td>

            <td>{ this.props.data.car_make}</td>
          </tr>

          <tr className="item">
            <td>Model</td>
            <td>{this.props.data.car_model}</td>
          </tr>

          <tr className="item">
            <td>Trim</td>

            <td>{this.props.data.car_trim}</td>
          </tr>

          <tr className="item">
            <td>Year</td>

            <td>{this.props.data.car_year}</td>
          </tr>

          <tr className="heading">
            
            <td>Car status</td>
            <td>Prices</td>
          </tr>

          <tr className="item">
            <td>Very bad</td>

            <td> {convert(this.props.data.car_price.very_bad.min_price)}- {convert(this.props.data.car_price.very_bad.max_price)}</td>
          </tr>

          <tr className="item">
            <td>Bad</td>

            <td>{convert(this.props.data.car_price.bad.min_price)}-{convert(this.props.data.car_price.bad.max_price)}</td>
          </tr>

          <tr className="item">
            <td>Good</td>

            <td>{convert(this.props.data.car_price.good.min_price)}-{convert(this.props.data.car_price.good.max_price)}</td>
          </tr>

          <tr className="item">
            <td>Very good</td>

            <td>{convert(this.props.data.car_price.very_good.min_price)}-{convert(this.props.data.car_price.very_good.max_price)}</td>
          </tr>
          <tr className="item">
            <td>
              <img src={logo} className="main-logo"/>
            </td>
            <td>
              <img src={QR} className="main-logo float-right"/>
            </td>
          </tr>

          </table>
      
            <div className="no-printme row p-5">
              <button className="btn col-md-3 m-2 text-center" onClick={()=>this.props.showCerti()}>Back</button>
              <span className="col-md-5"></span>
              <button
                className="btn col-md-3 m-2"
                onClick={() => {window.print();}}>
                Print
              </button>
             
            </div>
           
          </div>
        

    );
  }
}