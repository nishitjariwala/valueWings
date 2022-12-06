import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiCopyrightLine } from "react-icons/ri";
import "./footer.scss";
import {Link } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default class Footer extends Component {
  render() {
    return (
      
      <div className="no-printme footer" style={{bottom:'0px'}}>
        <div class="nav__ul">
          <h1 class="footer-brand" style={{color:'#636cff'}}>ValueWings</h1>
        </div>
        <ul class="footer__nav">
          <li class="nav__item">
            <h2 class="nav__title">Company</h2>

            <ul class="nav__ul">
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>

              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
            </ul>
          </li>

          <li class="nav__item">
            <h2 class="nav__title">Products</h2>

            <ul class="nav__ul">
              <li>
                <Link to="/carsearch">Price Calculator</Link>
              </li>

              <li>
                <Link to="/compare">Compare Cars</Link>
              </li>
            </ul>
          </li>


          {/* <li class="nav__item nav__item--extra">
            <h2 class="nav__title">Products</h2>

            <ul class="nav__ul nav__ul--extra">
              <li>
              <Link style={{cursor:"pointer"}} to="/carsearch" className="nav-link">Price Calculator</Link>
    
              <Link style={{cursor:"pointer"}} to="/compare" className="nav-link">Compare Car</Link>
              </li>
            </ul>
            <li class="nav__item nav__item--extra"></li>
          </li> */}

          <li className="nav_item">
            <h2 class="nav__title">Contact</h2>
            <a className="mail-icon"  href="mailto:valuewings04@gmail.com"><FontAwesomeIcon icon={faEnvelope} size="2x"/></a>
            
          </li>
        </ul>
        <div class="legal">
          <p style={{ color: "#ffffff" }}>
            <RiCopyrightLine color="#ffffff" /> 2021 All rights reserved.
          </p>

        </div>
      </div>
    );
  }
}
