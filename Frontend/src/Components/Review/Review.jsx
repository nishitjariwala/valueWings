import React, { Component } from "react";
import "./review.scss";

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: []
    };
  }

  async componentDidMount() {
    let arr
  }
  render() {
    return (
      <div className="row">
        <div className="example-1 card">
          <div className="wrapper">
            <div className="data">
              <div className="content">
                <span className="author">Jane Doe</span>
                <h1 className="title">
                  <a href="#">
                    Boxing icon has the will for a couple more fights
                  </a>
                </h1>
                <p className="text">
                  The highly anticipated world championship fight will take
                  place at 10am and is the second major boxing blockbuster in
                  the nation after 43 years.
                </p>
                <label for="show-menu" className="menu-button">
                  <span></span>
                </label>
              </div>
              <input type="checkbox" id="show-menu" />
              <ul className="menu-content">
                <li>
                  <a href="#" className="fa fa-bookmark-o"></a>
                </li>
                <li>
                  <a href="#" className="fa fa-heart-o">
                    <span>47</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="fa fa-comment-o">
                    <span>8</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="example-1 card">
          <div className="wrapper">
            <div className="data">
              <div className="content">
                <span className="author">Jane Doe</span>
                <h1 className="title">
                  <a href="#">
                    Boxing icon has the will for a couple more fights
                  </a>
                </h1>
                <p className="text">
                  The highly anticipated world championship fight will take
                  place at 10am and is the second major boxing blockbuster in
                  the nation after 43 years.
                </p>
                <label for="show-menu" className="menu-button">
                  <span></span>
                </label>
              </div>
              <input type="checkbox" id="show-menu" />
              <ul className="menu-content">
                <li>
                  <a href="#" className="fa fa-bookmark-o"></a>
                </li>
                <li>
                  <a href="#" className="fa fa-heart-o">
                    <span>47</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="fa fa-comment-o">
                    <span>8</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
