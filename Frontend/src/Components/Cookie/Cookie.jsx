import React, { Component } from "react";
import "./cookie.scss";

export default class Cookie extends Component {
  render() {
    return (
    <div class="alert text-center cookiealert show" role="alert">
      <b>Do you like cookies?</b> 🍪 We use cookies to ensure you get the best experience on our website.
      <button type="button" class="btn btn-primary btn-sm ml-5" onClick={() => this.props.cookiePage()} >
      I understand
      </button>
    </div>
    );
  }
}
