import React, { Component } from "react";
import ImageGalleryComponent from './image-gallery.component';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
export default class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : null,
            selected : 'exterior'
        }
        

    }
        componentDidMount(){
         if(this.props.selected.model !== null){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        
        urlencoded.append("Model_id", this.props.selected.model);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("https://value-wings.herokuapp.com/api/cars/carImage", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data[0]  }) )
        .catch(error => console.log('error', error));
    }
    }

    render(){
        
        return(
            <div className="fluid-container">
                <div className="container">
            <Link  onClick={() => this.props.history.goBack()}> <FontAwesomeIcon icon={faAngleLeft} size="3x" color="#636cff"/></Link>
            </div>
            <h2 className="title" style={{marginTop:"2px"}}>
                            Gallery</h2>
                <div className="col-sm-12 row justify-content-center">
                    <button onClick={()=> this.setState({selected :"interior" })} className={this.state.selected === "interior" ? "col-sm-3 m-4 btn-search active1" : "col-sm-3 m-4 btn-search"}  style={{textAlign:"center", alignItems:"center"}}>Interior</button>
                    <button onClick={()=> this.setState({selected :"exterior" })}  className={this.state.selected === "exterior" ? "col-sm-3 m-4 btn-search active1" : "col-sm-3 m-4 btn-search"} style={{textAlign:"center", alignItems:"center"}}>Exterior</button>
                    <button onClick={()=> this.setState({selected :"degree" })}  className={this.state.selected === "degree" ? "col-sm-3 m-4 btn-search active1" : "col-sm-3 m-4 btn-search"} style={{textAlign:"center", alignItems:"center"}}>360° View</button>
                </div>
                {this.state.data === null ? <></> 
                : 
                    
                    <div className="container col-md-7 mx-auto mb-5">
                        <ImageGalleryComponent selected={this.state.selected} interior={this.state.data.interior} exterior={this.state.data.exterior} degreeimages={this.state.data.degreeimages[0]}/>
                    </div>
                }
            </div>

        );
    }
}