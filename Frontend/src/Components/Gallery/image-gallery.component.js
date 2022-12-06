import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./gallery.scss";
import {Carousel} from 'react-responsive-carousel';


export default class ImageGallaryComponent extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        
        return(
                <>
                
                    { 
                    this.props.selected === "interior" ?
                    <Carousel  stopOnHover={true} dynamicHeight={true} autoPlay interval="2000" transitionTime="180" style={{paddingBottom:"35px", alignItems:"center"}}>
                        { this.props.interior.map((item) => 
                            <div >
                                <img width="80vw" src={item.interior_image}/>
                            </div>
                        )
                        }
                    </Carousel>
                        :
                        <></>
                    }
                    { 
                        this.props.selected === "exterior" ?
                        <Carousel  stopOnHover={true} dynamicHeight={true}  autoPlay interval="2000" transitionTime="180" style={{paddingBottom:"35px", alignItems:"center"}}>{
                        this.props.exterior.map((item) => 
                            <div>
                                <img width="80vw" src={item.exterior_image}/>
                            </div>
                        )}
                        </Carousel>
                        :
                        <></>
                    }
                    {  this.props.selected === "degree" ?
                        <div style={{width:"100%"}} >
                            <h1 className="text-center m-3" style={{color:"#636cff"}}>Interior</h1>
                        {this.props.degreeimages.interior_360 === null ? <h3 className="text-center m-5">Interior 360 Degree View Not Available. We Will Update it Soon</h3> :
                        <iframe style={{borderColor:"#636cff",border:"2px solid"}}  frameborder="0" allowfullscreen="" src={this.props.degreeimages.interior_360} width="100%" height="500vh"/>}
                            <h1 className="text-center m-3" style={{color:"#636cff"}}>Exterior</h1>
                        {this.props.degreeimages.exterior_360 === null ? <h3 className="text-center m-5">Exterior 360 Degree View Not Available. We Will Update it Soon</h3> :
                        <iframe  style={{borderColor:"#636cff",border:"2px solid"}}  frameborder="0" allowfullscreen="" src={this.props.degreeimages.exterior_360} width="100%" height="500vh"/>}
                        </div>
                    : <></>
                    }
                </>
           
        );
    }
}