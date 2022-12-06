


import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{ Component} from "react";
import { Link,Redirect } from "react-router-dom";
import { convert } from "../../Shared/INRConvert";
import  Certificate  from "../Certificate/Certificate";
export default class CarPrice extends Component{
    constructor(props){
        super(props);
        this.state={
            data:null,
            maxPrice:null,
            minPrice:null,
            category:'',
            active:'good',
            certi:false
        }
        this.showCerti = this.showCerti.bind(this);
    }
    showCerti = () => {
        this.setState((prev) => ({certi:!prev.certi}));
    }
    componentDidMount(){
        if(this.props.selected.make !== null){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("Make_id", this.props.selected.make);
        urlencoded.append("Model_id", this.props.selected.model);
        urlencoded.append("Year_id",this.props.selected.year);
        urlencoded.append("Trim_id", this.props.selected.trim);
        urlencoded.append("kms", this.props.selected.kms);
        urlencoded.append("token",this.props.user);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://value-wings.herokuapp.com/api/cars/getCarPrice", requestOptions)
        .then((response) => response.json())
        .then(response => response.data)
        .then(response => {

            let data = response;
            
            this.setState({
                data:data,
                category:'good', 
                maxPrice : data.car_price.good.max_price,
                minPrice : data.car_price.good.min_price
            });
        })
        .catch(error => console.log('error', error));
    }
}

    render()
    {
        
        if(this.props.selected.year === ""){
            return <Redirect to="/"/>
        }
        if(this.state.certi)
        return <Certificate data={this.state.data} user={this.props.user} carDetails={this.props.selected} showCerti={this.showCerti}/>
        else
        return(
            <div className="fluid-container text-center">
                
                { this.state.data ?
                <>
                {this.state.category !== '' ?
                    <Value  category={this.state.category}
                                    history={this.props.history}
                                    maxPrice={this.state.maxPrice}
                                    minPrice={this.state.minPrice}
                                    selectedMake={this.state.data.car_make}
                                    selectedModel={this.state.data.car_model}
                                    selectedYear={this.state.data.car_year} 
                                    selectedTrim={this.state.data.car_trim}
                                    kms={this.props.selected.kms}
                                    carImage={this.state.data.car_image}
                                    clearDetails={this.props.clearDetails} /> : <></>} 
                <h4 style={{color:"#636cff"}}>Select condition of your vehicle</h4>
                <div className="col-lg-12 row justify-content-center">
                    <button  className={this.state.category === "very good" ? "col-lg-2 m-4 btn-search active1" :"col-lg-2 m-4 btn-search"} onClick={() => this.setState({category:'very good', maxPrice : this.state.data.car_price.very_good.max_price,minPrice : this.state.data.car_price.very_good.min_price})} >Very Good</button>
                    <button className={this.state.category === "good" ? "col-lg-2 m-4 btn-search active1" :"col-lg-2 m-4 btn-search"} onClick={() => this.setState({category:'good', maxPrice : this.state.data.car_price.good.max_price,minPrice : this.state.data.car_price.good.min_price})}>Good</button>
                    <button className={this.state.category === "bad" ? "col-lg-2 m-4 btn-search active1" :"col-lg-2 m-4 btn-search"} onClick={() => this.setState({category:'bad', maxPrice : this.state.data.car_price.bad.max_price,minPrice : this.state.data.car_price.bad.min_price})}>Bad</button>
                    <button className={this.state.category === "very bad" ? "col-lg-2 m-4 btn-search active1" :"col-lg-2 m-4 btn-search"} onClick={() => this.setState({category:'very bad', maxPrice : this.state.data.car_price.very_bad.max_price,minPrice : this.state.data.car_price.very_bad.min_price})}>Very Bad</button>
                </div>
                </>
                : <></>}
            <div className="row col-lg-12 mb-5">
            <div className="col-lg-10"></div>
            <div className="col-lg-2"><button className="btn" style={{backgroundColor:'#636cff'}} onClick={()=>this.showCerti()}>Get certificate</button></div>
            </div>
            </div>
            
        );

    }
    
    
}
export const Value = (props) => {
    
    return(
        <div className="col-sm-12 text-center mb-5 pb-2">
        <div className="row col-12">
        <div className="col-1 ml-4">
        <Link onClick={() => props.history.goBack()}> <FontAwesomeIcon icon={faAngleLeft} size="3x" color="#636cff"/></Link>
        </div>
        <div className="col-5">
            
            <h3 style={{color:"#636cff"}}>{props.selectedMake} {props.selectedModel} </h3><h4 className="text-secondary">{props.selectedTrim}</h4>
        </div>
        <div className="col-1"></div>
        <div className="col-4">
            <table>
                <tr>
                    <td>
                    <h5>Year: </h5>
                    </td>
                    <td>
                    <h5 style={{color:"#636cff"}}>{props.selectedYear}</h5>
                    </td>
                </tr>
                <tr>
                    <td>
                    <h5> Kms driven:</h5>
                    </td>
                    <td>
                    <h5 style={{color:"#636cff"}}>{props.kms}</h5>
                    </td>
                </tr>

            </table>
            
        </div>
        </div>
        <div className="mx-auto d-block col-sm-4">
        <img src={props.carImage} width="100%" class="rounded mx-auto d-block" alt="image"/>
        </div>
        <div className="col-sm-12 p-2">
            <h3>Car in {props.category} condition is valued at</h3>
        </div>
        <div className="col-sm-12 p-1"> 
            <h1 style={{color:"#636cff"}}>{convert(props.minPrice)}-{convert(props.maxPrice)}</h1>
        </div>
    </div>
    );
}
