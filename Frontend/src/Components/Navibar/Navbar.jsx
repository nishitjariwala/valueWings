import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Nav,Navbar,NavDropdown  } from "react-bootstrap";
import logo from "../../Images/Logo.png";

export default class Navibar extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }  

  //handle Logout
  handleLogout = () => {
      this.props.logoutUser();
  }

  render() {  
      return (
          <Navbar collapseOnSelect sticky="top" expand="md">
          <Navbar.Brand><Link className="nav-link" style={{color:'#636cff'}} to="/home"><img height="40px" src={logo}/></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="my-nav" />
          <Navbar.Collapse id="my-nav">
            <Nav className="ml-auto mr-5">
            <Nav.Item><Link className="nav-link p-3" to="/home">Home</Link></Nav.Item>
            
            {/* <Nav.Item><Link className="nav-link p-3" to="/carSearch" >Price Calculator</Link></Nav.Item>
               */}
              <NavDropdown title="Services" className="nav-link" id="dropdown-1">
                <NavDropdown.Item><Link to="/carSearch" className="nav-link">Price Calculator</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/compare" className="nav-link">Compare Cars</Link></NavDropdown.Item>
              </NavDropdown>
              <Nav.Item><Link className="nav-link p-3" to="/aboutus">About us</Link></Nav.Item>
            {this.props.isLoggedIn ? 
                  <NavDropdown title="Account" className="nav-link" id="dropdown-2">
                    <NavDropdown.Item ><Link className="nav-link" to="/Profile">My Profile</Link></NavDropdown.Item>
                    {/* <NavDropdown.Item><Link className="nav-link" to="/home">My Cars</Link></NavDropdown.Item> */}
                    <NavDropdown.Item><Link className="nav-link" onClick={this.handleLogout}> Logout</Link></NavDropdown.Item>
                  </NavDropdown>
                  :
                  <Nav.Item><Link className="nav-link p-3" to="/Login">Login</Link></Nav.Item>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
}
}