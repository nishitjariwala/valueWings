import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.scss";
import { Link as ScrollLink } from "react-scroll";
import Update from "../UpdateProfile/Update";
import { decrypt } from "../../Shared/Encryption";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateprofile:false,
      data: {
        f_name: "",
        l_name: "",
        email: "",
        phone_no: "",
        city: "",
      },
      isMobile: window.innerWidth > 768 ? false :true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  
  //handle resize for responsive
  handleResize = (e) => {
    this.setState({ isMobile: window.innerWidth > 768 ? false :true });
  };

  //get profile data 
  async componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    var decoded = JSON.parse(decrypt(this.props.user));
    let data = await this.props.getData(decoded.Id);
    if(data)
      await this.setState({ data });
    else
      {}
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }
  
  render() {
    return (
      <div style={{marginTop:"2%",marginBottom:"9%"}}>
            <div className="container row col-12 ml-4">
        <div className="col-md-7 mt-5 ">
      <div className="wrapper" style={!this.state.isMobile ? {boxShadow: "0 1px 20px 0 rgba(69, 90, 100, 0.08)"} : {}}>
        {!this.state.isMobile ? 
        <div className="left">
          <h4>
            <strong>{this.state.data.f_name}</strong><br/> {this.state.data.l_name}
          </h4>
        </div>
        : <></>}
        <div className="right">
          <div className="info">
            {this.state.isMobile ? <h3><strong>{this.state.data.f_name}</strong><br/> {this.state.data.l_name}</h3>:<h3>Your Account</h3>}
            <span className="projects_data">
              <span className="data">
                <h4>Email</h4>
                <p>{this.state.data.email}</p>
              </span>
              </span>
              <span className="projects_data">
              <span className="data">
                <h4>Phone</h4>
                <p>{this.state.data.phone_no}</p>
              </span>
              </span>
            <div  className="projects">
              <div className="projects_data">
                <div className="data">
                  <h4>City</h4>
                  <p>{this.state.data.city}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 row">
          <div className="col-md-6 button-2">
          <ScrollLink className="update" onClick = {()=> this.setState({updateprofile:!this.state.updateprofile})}  to="update1" spy={true} smooth={true}>
              Update Profile
          </ScrollLink>
          </div>
          <div className="col-md-6 button-2">
          <Link to="/changePassword"  className="update">Change Password</Link>
          </div>
          </div>
        </div>
      </div>
      </div>
      <div className="col-md-5">
      <div id={this.state.isMobile ? "update1" : ""}  className="" style={{top:"50%",left:"60%"}}>

      {/* update Profile */}
      {this.state.updateprofile ?  <Update history={this.props.history} user={this.props.user} getData={this.props.getData} updateProfile={this.props.updateProfile}/> : <></>}
      </div>
      </div>
      </div>

      </div>

    );
  }
}
