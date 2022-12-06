import "./auth.scss";
import React from "react";
import  Login  from "./Login/Login";
import  Register  from "./Register/Register";
import Footer  from "../Footer/Footer";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()

export default class Auth extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
      isLoginActive: true,
      isMobile: window.innerWidth > 768 ? false :true
    }

    this.handleResize = this.handleResize.bind(this);
  }
  handleResize = (e) => {
    this.setState({ isMobile: window.innerWidth > 768 ? false :true });
  };
  
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  
  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }
    
  //change screen login  <=> register
  changeState() {
    if(!this.state.isMobile){
      const { isLoginActive } = this.state;
      if (isLoginActive) {
        this.rightSide.classList.remove("right");
        this.rightSide.classList.add("left");
      }
      else {
        this.rightSide.classList.remove("left");
        this.rightSide.classList.add("right");
      }
    }
    this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive}))
  }

  render() {

    const { isLoginActive } = this.state;
    const current = isLoginActive ? "Register" : "Login";
    const currentActive = isLoginActive ? "login" : "register";
    return (
      <div>
      <div className="App">
        <div className="login">
          <div className={this.state.isMobile ? "" : "container"} ref={ ref => (this.container = ref)}>
            { isLoginActive && (<Login  history={this.props.history} isMobile={this.state.isMobile} location={this.props.location} onClick={this.changeState.bind(this)} checkUser={this.props.checkUser} containerRef={ref => (this.current = ref)}/> )}
            { !isLoginActive && (<Register isMobile={this.state.isMobile} onClick={this.changeState.bind(this)} postUser={this.props.postUser} containerRef={ref => (this.current = ref)}/> )}
          </div>
        {(!this.state.isMobile) ?  
          <RightSide current={current} currentActive={ currentActive } containerRef={ref => (this.rightSide = ref)} onClick={this.changeState.bind(this)}/>
          :
          <></>
        }
          </div>
          </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <>
    <div className="right-side right" ref={props.containerRef} onClick={props.onClick}>
      <div className="inner-container">
        <div className="text">  
          {props.current}
        </div>
      </div>
    </div>
    </>
  );
}

