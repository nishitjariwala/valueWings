import React, { Component } from "react";
import "./home.scss";
import Cars from "../../Images/cars.svg";
import { Link as ScrollLink } from "react-scroll";
import CarNews from "../CarNews/CarNews";
import Cookie  from "../Cookie/Cookie"
import Search from "../CarSearch/CarSearch"

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded : false,
      pageLoad : false
    }
    this.cookiePage = this.cookiePage.bind(this);
  }
  //show cookie notification first time 
  cookiePage = () => {
    this.setState(({
      loaded : false
    }))
    localStorage.setItem("cookie",true);
  }

  //check cookie is undrstand by user
  componentDidMount(){
    setTimeout(() =>  this.setState({pageLoad : true}),500)
    try{
      if(!localStorage.getItem("cookie")){
      setTimeout(()=> this.setState({
        loaded:true
      }),3000);
      }
    }catch(err){

    }
  }
  

  render() {
    return (
      <div>
      <section id="header" className="">
        <div className="container-fluid nav_bg p-0 m-0">
            <div className="col-10 mx-auto">
              <div className="row">
                
                <div className="col-lg-6 pt-5 pt-lg-0 order-0 order-lg-1">
                  <h1>
                    Make the better price with{" "}
                    <strong className="brand-name">ValueWings</strong>
                  </h1>
                  <h2 className="my-3">We are the team of price makers</h2>
                  <div className="mt-3">
                    <ScrollLink to="carSearch" spy={true} smooth={true} className="btn-get-started">
                      Get Value
                    </ScrollLink>
                  </div>
                </div>
                <div className="col-lg-6 order-2 order-lg-3 header-img">
                  <img src={Cars} alt="Cars Image" className="img-fluid" />
                </div>
              </div>
            </div>
            {/* Car Searching */}
            <div >

            <Search isLoggedIn={this.props.isLoggedIn} history={this.props.history} setCar={this.props.setCar}/>

          <div id="carNews" className="col-lg-12 title">Car News</div> 
          <CarNews news={this.props.news}/>
          </div>
          </div>
      </section>
      {this.state.loaded ? <Cookie cookiePage={this.cookiePage}/> : <></>}
      </div>
    );
  }
}
