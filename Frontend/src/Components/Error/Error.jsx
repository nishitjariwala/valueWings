import React from 'react';
import errorImg from '../../Images/404.svg';

let ErrorPage = (props) => {
    return(
        <div className="container p-5 m-5">
            <div className="col-6"></div>
        <div className="text-center col-12">
        <h1 className="title">Sorry this page has been towed..</h1>
        <p>{props.err}</p>
        </div>
        <div className="col-12 image">
            <img src={errorImg} width="100%" height="50%" style={{ display:"block", margin: "auto", alignItems:"center", justifyContent:"center", marginTop:"25px"}}/>
        </div>
        </div>
    )
} 
export default ErrorPage;