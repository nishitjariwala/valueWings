import React from "react";
import "./AboutUs.css";
import logo from "../../Images/image.png";
import cal from "../../Images/icons8-estimate-64.png";
import car from "../../Images/icons8-account-64.png";
import val from "../../Images/icons8-bonds-64.png";
import news from "../../Images/icons8-us-news-64.png";
import newid from "../../Images/icons8-new-96.png";
import check from "../../Images/icons8-checkmark-96.png";
import shop from "../../Images/icons8-fast-cart-96.png";
import buyer from "../../Images/icons8-lease-96.png";
import seller from "../../Images/icons8-sell-96.png";

const AboutUs = () => {
  return (
    <div className="container">
      <h2
        className="text-left p-4"
        style={{fontSize:"42px", position: "static", color: "#636cff", opacity: 1 }}>
        About ValueWings
      </h2>
      <br />

      <div className="row">
        <div className="col-sm-4">
          <div className="fakeimg block pl-5 pr-5">
            <img src={logo} width="100%" className="fakeimg_img"></img>{" "}
          </div>
          <hr className="d-sm-none" />
        </div>
        <div className="col-sm-8 pl-4">
          <p className="text-left">
            {" "}
            Approximately 40 million used vehicles are sold each year. Effective
            pricing strategies can help any User to efficiently sell or buy Cars
            in a competitive market and make sure that he is not making loss.
          </p>
          <p className="text-left">
            In the automotive sector, pricing calculation play an essential role
            for both Seller and Buyer to assess the market price of a vehicle
            before putting it on sale or buying it.
          </p>
          <p className="text-left">
            The rise of used cars sales is exponentially increasing. Car dealers
            sometimes take advantage of this scenario by listing unrealistic
            prices owing to the demand.
          </p>
        </div>
      </div>
      <br />
      <div className="col-lg-12 pt-5  ">
        <div className="rectangelBox"> </div>
        <h1 className="heading1 "> What is Value Wings ?</h1>
        <div className="row">
          <div className="col-sm-3 text-center  row_item">
            <div className="smallImg">
              <img
                src={cal}
                style={{ height: "40px", width: "40px" }}
                className="fakeimg_img"
              ></img>
            </div>
            Alogorithmic price calculations of used cars.
          </div>
          <div className="col-sm-3 text-center row_item">
            <div className="smallImg">
              <img
                src={car}
                style={{ height: "40px", width: "40px" }}
                className="fakeimg_img"
              ></img>
            </div>
            Fair market value for used car
          </div>

          <div className="col-sm-3 text-center row_item">
            <div className="smallImg">
              <img
                src={val}
                style={{ height: "40px", width: "40px" }}
                className="fakeimg_img"
              ></img>
            </div>
            Provide car value based on its condition.
          </div>
          <div className="col-sm-3 text-center row_item">
            <div className="smallImg">
              <img
                src={news}
                style={{ height: "45px", width: "45px" }}
                className="fakeimg_img"
              ></img>
            </div>
            Gives Latest car related news.
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="rectangelBox"></div>
        <h1 className="heading1 ">How it works ? </h1>
        <div className="row">
          <div className="col-sm-4 text-center  row_item">
            <div className="midiumImg">
              <img
                src={newid}
                style={{ height: "55px", width: "55px" }}
                className="fakeimg_img"
              ></img>
            </div>
            Select purpose <br /> (Used/New)
          </div>
          <div className="col-sm-4 text-center row_item">
            <div className="midiumImg">
              <img
                src={check}
                style={{ height: "55px", width: "55px" }}
                className="fakeimg_img"
              ></img>
            </div>
            Select parameters
            <br />
            (Make, Model, Year, Trim)
          </div>

          <div className="col-sm-4 text-center row_item">
            <div className="midiumImg">
              <img
                src={shop}
                style={{ height: "55px", width: "55px" }}
                className="fakeimg_img"
              ></img>
            </div>
            Get Value Wings <br />
            (Fair market value of Car)
          </div>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="rectangelBox"></div>
        <h1 className="heading1 "> Who can use it ?</h1>
        <div className="row">
          <div className="col-sm-6 text-center  row_item">
            <div className="largeImg">
              <img
                src={buyer}
                style={{ height: "70px", width: "70px" }}
                className="fakeimg_img"
              ></img>
            </div>
            <h3>Buyer</h3> <br /> Use India’s De facto industry standard for
            used vehicle pricing to get the fair market price of any used
            vehicle under 10 seconds for free.
          </div>
          <div className="col-sm-6 text-center row_item">
            <div className="largeImg">
              <img
                src={seller}
                style={{ height: "70px", width: "70px" }}
                className="fakeimg_img"
              ></img>
            </div>
            <h3>Seller</h3>
            <br />
            Use Value wings to make sure you get paid what buyer is willing to
            pay versus suffering from huge markup margin of a middleman.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
