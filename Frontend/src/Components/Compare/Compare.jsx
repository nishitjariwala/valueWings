import React, { Component } from "react";
import Logo from "../../Images/Logo.png";
import "./compare.scss";
import {convert} from "../../Shared/INRConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheckCircle,  faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { Link } from "react-router-dom";


toast.configure()

export default class Compare extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      category:'used',
      Makes:[],
      selectedMake1:'',
      selectedMake2:'',
      Models1:[],
      Models2:[],
      selectedModel1:'',
      selectedModel2:'',
      car1:{
        "max_price": "",
        "min_price": "",
        "make": "",
        "model": "",
        "image_path": "",
        "height": "",
        "width": "",
        "length": "",
        "wheelbase": "",
        "ground_clearance": "",
        "doors": "",
        "seating_rows": "",
        "bootspace": "",
        "fuel_tank_capacity": "",
        "front_suspension": "",
        "rear_suspensioncolumn1": "",
        "front_break_type": "",
        "rear_break_type": "",
        "minimum_turning_radious": "",
        "steering_type": "",
        "wheels": "",
        "spare_wheels": "",
        "front_tyers": "",
        "rear_tyers": "",
        "airbags": "",
        "child_seat_anchor_points": "",
        "seat_belt_warning": ""
    },
      car2:{
        "max_price": "",
        "min_price": "",
        "make": "",
        "model": "",
        "image_path": "",
        "height": "",
        "width": "",
        "length": "",
        "wheelbase": "",
        "ground_clearance": "",
        "doors": "",
        "seating_rows": "",
        "bootspace": "",
        "fuel_tank_capacity": "",
        "front_suspension": "",
        "rear_suspensioncolumn1": "",
        "front_break_type": "",
        "rear_break_type": "",
        "minimum_turning_radious": "",
        "steering_type": "",
        "wheels": "",
        "spare_wheels": "",
        "front_tyers": "",
        "rear_tyers": "",
        "airbags": "",
        "child_seat_anchor_points": "",
        "seat_belt_warning": ""
    }
    }
    this.getMakes = this.getMakes.bind(this);
    this.getModels = this.getModels.bind(this);
    this.getData = this.getData.bind(this);
  }
  //get Makes
  getMakes = () => {  
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    return fetch("https://value-wings.herokuapp.com/api/cars/getMake", requestOptions)
    .then((response) => response.json())
    .then((response => response.data.data))
    .catch(error => console.log('error', error));
  }

  //get Model
  getModels = (id,make) => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("Make_id", id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    fetch("https://value-wings.herokuapp.com/api/cars/getModel", requestOptions)
    .then((response) => response.json())
    .then(response => response.data.data)
    .then(response => {
      let Models = response;
      if(make === "make1"){
        if(this.state.selectedModel2 !== ''){
          
          Models = this.filter_car(Models,this.state.selectedModel2);
          
        }
        this.setState({
          Models1:Models
        })
      }
      else{
        if(this.state.selectedModel1 !== ''){
          
          Models = this.filter_car(Models,this.state.selectedModel1);
          
        }
        this.setState({
          Models2:Models
        })
      }
    })
    .catch(error => console.log('error', error));
  }


handleChange = async(e) => {

  let name = e.target.name;
  let val = e.target.value;
  switch(name){
    case "make1":
      await this.setState({
        selectedMake1:val,
        selectedModel1:'',
        Models1:[],
        });
        
      this.getModels(this.state.selectedMake1,"make1");
      break;
    case "model1":
        await this.setState({
        selectedModel1:val,
        });
      if(this.state.selectedMake2 !== '')
        await this.getModels(this.state.selectedMake2,"make2");  
      this.getData(this.state.selectedMake1,this.state.selectedModel1,"car1")
        break;
    case "make2":
      await this.setState({
        selectedMake2:val,
        selectedModel2:'',
        Models2:[],
        });
      this.getModels(this.state.selectedMake2,"make2");
      break;
    case "model2":
        await this.setState({
        selectedModel2:val,
        });
        
        if(this.state.selectedMake1 !== '')
          await this.getModels(this.state.selectedMake1,"make1");
        this.getData(this.state.selectedMake2,this.state.selectedModel2,"car2")
        break;
    default :
    break;
      }
    }

    //filter when same
    filter(item,val){
      return val != item.model_id;
    }

    //function to filter car data
    filter_car = (array,val) => {
      var filtered = array.filter(item => this.filter(item,val));
      return filtered;
    }

    //compare cars
    getData = (make,model,car) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("make", make);
      urlencoded.append("model", model);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("https://value-wings.herokuapp.com/api/cars/getCarDetails", requestOptions)
        .then(response => response.json())
        .then(result => {
          if(car === "car1")
            this.setState({
              car1:result.data
            })
          else
            this.setState({
              car2:result.data
            })
        })
        .catch(error => console.log('error', error));
    
  }

    async componentDidMount(){
        let Makes = await this.getMakes();
        this.setState({Makes})
    }
  render() {
    let car1 = this.state.car1;
    let car2 = this.state.car2;
    return (
      <div>
            {/* <div className="container">
            <Link  onClick={() => this.props.history.goBack()}> <FontAwesomeIcon icon={faAngleLeft} size="3x" color="#636cff"/></Link>
            </div> */}
        <div id="compare" className="col-lg-12 compare text-center">
          Value Battle
        </div>
        <div  className="container">
        <table className="no-printme table table-borderless" style={{marginBottom:"100px"}}>
          <tr>
              <th className="text-center"><h3 style={{color:"#636cff"}}>Car 1</h3></th>
              <th className="text-center"><h3 style={{color:"#636cff"}}>Car 2</h3></th>
          </tr>
          <tr>
          
          <th className="p-2">
              <select
                name="make1"
                onChange={async(e)=> this.handleChange(e)}>
                <option value="">Select Make</option>
                {this.state.Makes.map((item) => {
                    return <option key={item.make_id} value={item.make_id}>{item.make_name}</option>
                })
                }
                </select>
                <span className="custom-arrow ml-0"></span>
            </th>

            <th className="p-2">

            <select
                name="make2"
                onChange={async(e)=> this.handleChange(e)}>
                <option value="">Select Make</option>
                {this.state.Makes.map((item) => {
                    return <option key={item.make_id} value={item.make_id}>{item.make_name}</option>
                })
                }
                </select>
                <span className="custom-arrow ml-0"></span>
              
            </th>
            
          </tr>
          <tr>
          
        <th className="p-2">
        <select
                name="model1"
                onChange={async(e)=> this.handleChange(e)}>
                          <option value="">Select Model</option>
                            {this.state.Models1.map((item) => {
                                return <option key={item.model_id} value={item.model_id}>{item.model_name}</option>
                            })
                            }
              </select>
              <span className="custom-arrow"></span>
            </th>

            <th className="p-2">
              <select
                name="model2"
                onChange={async(e)=> this.handleChange(e)}>
                          <option value="">Select Model</option>
                            {this.state.Models2.map((item) => {
                                return <option key={item.model_id} value={item.model_id}>{item.model_name}</option>
                            })
                            }
              </select>
              <span className="custom-arrow"></span>
            </th>
            
          </tr>
        </table>
        {this.state.selectedModel1 !== '' && this.state.selectedModel2 !== '' && this.state.selectedModel2 !== this.state.selectedModel1 ?
        <div className="comparison pagetitle">
        <table>
          <thead>
            <tr>
              <th>
              <img src={Logo} className="img-fluid" />
              </th>
              <th className="product">{car1.make} {car1.model}</th>
              <th className="product">{car2.make} {car2.model}</th>
            </tr>   
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td colspan="3">Images</td>
            </tr>
            <tr className="compare-row">
              <td>Images</td>
              <td>
                  <img src={car1.image_path} width="190vw"  />
              </td>
              <td>
                <img src={car2.image_path} width="190vw" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td colspan="3">Price</td>
            </tr>
            
            
            <tr className="compare-row">
              <td>Price</td>
              <td>
                <span>{convert(car1.min_price)}-{convert(car1.max_price)}</span>
              </td>
              <td>
                <span>{convert(car2.min_price)}-{convert(car2.max_price)}</span>
              </td>
            </tr>
            
            {/* 1 module  */}

            <tr>
              <td></td>
              <td colspan="3"><h3 style={{fontWeight:"bolder",color:"#303030"}}>Dimension and Weight</h3></td>
            </tr>

            <tr className="compare-row">
              <td className="text-center" colSpan="3">
                <span><h3 style={{fontWeight:"bolder",color:"#303030"}}>Dimension and Weight</h3></span>
              </td>
            </tr>
            
            <tr>
              <td></td>
              <td colspan="3">Length</td>
            </tr>
            
            
            <tr className="compare-row">
              <td>Length</td>
              <td>
                <span>{car1.length}</span>
              </td>
              <td>
                <span>{car2.length}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Width</td>
            </tr>
            <tr>
              <td>Width</td>
              <td>
                <span>{car1.width}</span>
              </td>
              <td>
                <span>{car2.width}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Height</td>
            </tr>
            <tr className="compare-row">
              <td>Height</td>
              <td>
                <span>{car1.height}</span>
              </td>
              <td>
                <span>{car2.height}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="4">Wheelbase</td>
            </tr>
            <tr>
              <td>Wheelbase</td>
              <td>
                <span>{car1.wheelbase}</span>
              </td>
              <td>
                <span>{car2.wheelbase}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Ground clearance</td>
            </tr>
            <tr className="compare-row">
              <td>Ground clearance</td>
              <td>
                <span>{car1.ground_clearance}</span>
              </td>
              <td>
                <span>{car2.ground_clearance}</span>
              </td>
            </tr>

          {/* 2nd module */}

          <tr>
              <td></td>
              <td colspan="3"><h3 style={{fontWeight:"bolder",color:"#303030"}}>Capacity</h3></td>
            </tr>

            <tr className="compare-row">
              <td className="text-center" colSpan="3">
                <span><h3 style={{fontWeight:"bolder",color:"#303030"}}>Capacity</h3></span>
              </td>
            </tr>
            
            <tr>
              <td></td>
              <td colspan="3">Doors</td>
            </tr>
            
            
            <tr className="compare-row">
              <td>Doors</td>
              <td>
                <span>{car1.doors}</span>
              </td>
              <td>
                <span>{car2.doors}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">No of Seating Rows (Rows)</td>
            </tr>
            <tr>
              <td>No of Seating Rows (Rows)</td>
              <td>
                <span>{car1.seating_rows}</span>
              </td>
              <td>
                <span>{car2.seating_rows}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Bootspace (litres)</td>
            </tr>
            <tr className="compare-row">
              <td>Bootspace (litres)</td>
              <td>
                <span>{car1.bootspace}</span>
              </td>
              <td>
                <span>{car2.bootspace}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="4">Fuel Tank Capacity (litres)</td>
            </tr>
            <tr>
              <td>Fuel Tank Capacity (litres)</td>
              <td>
                <span>{car1.fuel_tank_capacity}</span>
              </td>
              <td>
                <span>{car2.fuel_tank_capacity}</span>
              </td>
            </tr>

            {/* 3rd Module */}

            <tr>
              <td></td>
              <td colspan="3"><h3 style={{fontWeight:"bolder",color:"#303030"}}>Suspension, Breaks, Steering, and Tyers</h3></td>
            </tr>

            <tr className="compare-row">
              <td className="text-center" colSpan="3">
                <span><h3 style={{fontWeight:"bolder",color:"#303030"}}>Suspension, Breaks, Steering, and Tyers</h3></span>
              </td>
            </tr>
            
            <tr>
              <td></td>
              <td colspan="3">Front Suspension</td>
            </tr>
            
            
            <tr className="compare-row">
              <td>Front Suspension</td>
              <td>
                <span>{car1.front_suspension}</span>
              </td>
              <td>
                <span>{car2.front_suspension}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Rear Suspension</td>
            </tr>
            <tr>
              <td>Rear Suspension</td>
              <td>
                <span>{car1.rear_suspension}</span>
              </td>
              <td>
                <span>{car2.rear_suspension}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Front Brake Type</td>
            </tr>
            <tr className="compare-row">
              <td>Front Brake Type</td>
              <td>
                <span>{car1.front_break_type}</span>
              </td>
              <td>
                <span>{car2.front_break_type}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="4">Rear Brake Type</td>
            </tr>
            <tr>
              <td>Rear Brake Type</td>
              <td>
                <span>{car1.rear_break_type}</span>
              </td>
              <td>
                <span>{car2.rear_break_type}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Minimum Turning Radius (metres)</td>
            </tr>
            <tr className="compare-row">
              <td>Minimum Turning Radius (metres)</td>
              <td>
                <span>{car1.minimum_turning_radious}</span>
              </td>
              <td>
                <span>{car2.minimum_turning_radious}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Steering Type</td>
            </tr>
            <tr className="compare-row">
              <td>Steering Type</td>
              <td>
                <span>{car1.steering_type}</span>
              </td>
              <td>
                <span>{car2.steering_type}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Wheels</td>
            </tr>
            <tr className="compare-row">
              <td>Wheels</td>
              <td>
                <span>{car1.wheels}</span>
              </td>
              <td>
                <span>{car2.wheels}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Spare Wheel</td>
            </tr>
            <tr className="compare-row">
              <td>Spare Wheel</td>
              <td>
                <span>{car1.spare_wheels}</span>
              </td>
              <td>
                <span>{car2.spare_wheels}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Front Tyres</td>
            </tr>
            <tr className="compare-row">
              <td>Front Tyres</td>
              <td>
                <span>{car1.front_tyers}</span>
              </td>
              <td>
                <span>{car2.front_tyers}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Rear Tyres</td>
            </tr>
            <tr className="compare-row">
              <td>Rear Tyres</td>
              <td>
                <span>{car1.rear_tyers}</span>
              </td>
              <td>
                <span>{car2.rear_tyers}</span>
              </td>
            </tr>

          {/* 4th module */}
          
          <tr>
              <td></td>
              <td colspan="3"><h3 style={{fontWeight:"bolder",color:"#303030"}}>Safety</h3></td>
            </tr>

            <tr className="compare-row">
              <td className="text-center" colSpan="3">
                <span><h3 style={{fontWeight:"bolder",color:"#303030"}}>Safety</h3></span>
              </td>
            </tr>
            
            <tr>
              <td></td>
              <td colspan="3">Airbags</td>
            </tr>
            
            
            <tr className="compare-row">
              <td>Airbags</td>
              <td>
                <span>{car1.airbags}</span>
              </td>
              <td>
                <span>{car2.airbags}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Child Seat Anchor Points</td>
            </tr>
            <tr>
              <td>Child Seat Anchor Points</td>
              <td>
                <span>{car1.child_seat_anchor_points  ? <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#636cff"/> : <FontAwesomeIcon icon={faTimesCircle} size="2x" color="#636cff"/>}</span>
              </td>
              <td>
                <span>{car2.child_seat_anchor_points  ? <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#636cff"/> : <FontAwesomeIcon icon={faTimesCircle} size="2x" color="#636cff"/>}</span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td colspan="3">Seat Belt Warning</td>
            </tr>
            <tr className="compare-row">
              <td>Seat Belt Warning</td>
              <td>
                <span>{car1.seat_belt_warning ? <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#636cff"/> : <FontAwesomeIcon icon={faTimesCircle} size="2x" color="#636cff"/>}</span>
              </td>
              <td>
                <span>{car2.seat_belt_warning ? <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#636cff"/> : <FontAwesomeIcon icon={faTimesCircle} size="2x" color="#636cff"/>}</span>
              </td>
            </tr>
            
          

          </tbody>
        </table>
        <button
                className=" no-printme btn col-md-3 m-2"
                onClick={() => {window.print();}}>
                Print
              </button>
        </div>
        :
        <></>    
        }
        </div>
      </div>
    );
  }
}
