import React from "react";
import loderImg from "../../Images/loader.gif"

const Loader = () =>{
    return(
        <div className="row container">
            <div className="col-lg-4"></div>
            <div className="col-lg-3">
                 <img src={loderImg}/>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}
export default Loader;