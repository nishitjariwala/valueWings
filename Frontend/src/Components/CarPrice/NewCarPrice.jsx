import { faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import React,{ Component} from "react";
import { Link,Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convert } from "../../Shared/INRConvert";

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
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://value-wings.herokuapp.com/api/cars/getNewCarData", requestOptions)
        .then((response) => response.json())
        .then(response => response.data)
        .then(response => {

            let data = response.data[0];
            
            this.setState({
                data:data,
            });
        })
        .catch(error => console.log('error', error));
    }}

    render()
    {
        if(this.props.user === null)
            return <Redirect push to="/login"/>

        if(this.props.selected.make === ""){
            return <Redirect to="/"/>
        }
        return(
            <div className="container text-center mb-5">
            <Link onClick={() => this.props.history.goBack()}> <FontAwesomeIcon icon={faAngleLeft} size="3x" color="#636cff"/></Link>
                { this.state.data ?
                <>
        <div className="col-lg-12 text-center m-4">
        <div className=" row col-lg-12 pt-3">
        <div className="col-lg-6">
            <h1 style={{color:"#636cff"}}>{this.state.data.make_name}</h1>   <h3 className="text-secondary mr-0">{this.state.data.model_name}</h3>
            <Link to ="/gallery"  className="btn get-started">Gallery</Link>
            {/* <h3 style={{color:"#636cff"}}>TATA Altroz XE Diesel</h3> */}
        </div>
        <div className="col-lg-6">
        <img src={this.state.data.image_path} width="50%" class="rounded mx-auto d-block" alt="image"/>
        </div>
        </div>
        <div id="invoice" className="invoice-box">
        {/* <div className="line"></div> */}
        <table cellSpacing="0" cellPadding="0">
            <tr className="heading">
                <td>Trim </td>
                <td>Price</td>
            </tr>
            {
            this.state.data.trims.map((item) => {
                return (
                    <tr key={item.key} className="item"> 
                            <td style={{color:"#636cff"}}>{item.trim_name}</td> 
                            <td> {convert(item.original_price)}</td> 
                    </tr>
                )
            })
        }
        </table>
        </div>
    </div>
                </>
                : <></>}
            </div>
            
        );

    }
    
    
}
