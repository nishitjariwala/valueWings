import React from "react";
import loginImg from "../../../Images/login.svg";
import { Link, Redirect } from "react-router-dom";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure()

//Email Regex
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

//Password Regex
const validPassRegex = RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"
);


export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            verified : new URLSearchParams(this.props.location.search).get("verified"),
            password:'',
            email: '',
            formError:   '',
            isverified: '',
            errors : {
                password : 'Password is required',
                email: 'Email is required'
            },
            done:false,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    
    //handle change onBlur and set
    handleChange = (event) =>{
        let name = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        //validation
        switch(name){
            case 'email' :errors.email =  val === '' ? 'Email is required' : validEmailRegex.test(val) ? '' : 'Email is not valid!';
                break;
                
            case 'password':
                errors.password = val === '' ? 'Password is required' : val.length > 7 ? validPassRegex.test(val) ? '' : 'password must contains capital letter,number and special character' : 'Password length atleast 8 digit long!';
                break;
            default:
                break;
        }

        this.setState({errors,[name] : val})
    }
    //


    //submit form
    submitForm = async(event) => {

        if(this.state.errors.email !== '') toast.warn(this.state.errors.email) ;
        if(this.state.errors.password !== '') toast.warn(this.state.errors.password) ;
        event.preventDefault();
        if(this.state.email !== '' && this.state.password !== '' && this.state.errors.email === '' && this.state.errors.password === '') {
            
            let check = await this.props.checkUser(this.state.email,this.state.password);
            
            if(check.done)  
            {
                this.setState({done:true});
                console.log("key",this.props.history.location.key);
                if(this.props.history.location.key === undefined)
                    this.props.history.push("/home");
                else
                    this.props.history.go(-1);
            }
            else
                {
                    
                this.setState({formError:check.message}) 
                }
            }
        else{}
            // toast.warn('Please fill valid details!')       
        
        if( this.state.formError !== ''){
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            toast.error(this.state.formError);
        }
        setTimeout(()=>{
            this.setState({
                formError:''
            })
        },2000)
    }

    render() {
        if(this.state.verified)
            setTimeout(()=>{this.setState({verified:false})},3000)
    
    return (
            <form onSubmit={this.submitForm}>
            
            <div className="base-container" ref={ this.props.containerRef }>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt="Login" />
                    </div>
                    <div className="form">
                        <span className="text-success">{this.state.verified ? "Your profile is verified" : ""}</span>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" tabIndex="1" name="email" onChange={this.handleChange} placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" tabIndex="2" name="password" onChange={this.handleChange} placeholder="Password" />
                            <Link tabIndex="4" to="/forgotPassword">Forgot Password ?</Link>
                        </div>
                    </div>
                </div>
                {(this.props.isMobile) ? <>New to ValueWings<p className="text-primary" tabIndex="5" onClick={this.props.onClick}>Register Here</p></> : <></>}
                <div className="footer1">
                    <button type="submit" tabIndex="3" className="btn">Login</button>
                    
                </div>
            </div>
        </form>
        );
    }
}