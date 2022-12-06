import React from "react";
import loginImg from "../../../Images/forgot_password.svg";
import { Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import { encrypt } from "../../../Shared/Encryption";  
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

//Email Regex
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
); 


export default class ForgotPwd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            done:'',
            emailErr: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.checkMail = this.checkMail.bind(this);
    }

    //handle changes and setState onBlur
    handleChange = (event) =>{
        let val = event.target.value;
        //validation
        let emailErr = validEmailRegex.test(val) ? '' : 'Email is not valid!';
        if(emailErr !== '') toast.warn(emailErr) ;
        this.setState({email : val,emailErr: emailErr});
    }

    //check mail is exists or not
    checkMail = (email) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("Email", encrypt(email));

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch("https://value-wings.herokuapp.com/api/user/emailForgotPassword", requestOptions)
        .then(response => { 
            if(response.status === 200){
                response.done = true
            }
            else{
                response.done = false
            }
            return response;
        }).catch(error => console.log('error', error));
    }

    //submit email
    submitForm =async (event) => {
        event.preventDefault();
        if(this.state.email !== '' && this.state.emailErr === '')
        {
            let check = await this.checkMail(this.state.email);
            if(check.status === 200)
                this.setState({done : 'Email has been sent, Please check your mailbox! '})
            else if(check.status === 201)
                this.setState({emailErr: 'Email has not been sent, try after some times!'})
            else
            this.setState({emailErr : 'Email is not exists!'});
        }
        else{
            this.setState({emailErr : 'Please enter valid mail!'});
        }
        //check for email Error
        if(this.state.emailErr){
            toast.error(this.state.emailErr);
        }
        //if successfully send mail
        if(this.state.done !== ''){
            toast.success(this.state.done);
            this.setState({email:''});
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        }
        setTimeout(()=>{
            this.setState({
                emailErr:'',
                done:''
            })
        },3000)    
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
            <div className="base-container1" ref={ this.props.containerRef }>
                <div className="header">Forgot Password</div>
                <div className="content">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="image">
                        <img src={loginImg} className="img" alt="forgot Password" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Enter Registered Email: </label>
                            <input type="text" tabIndex="1" name="email" onBlur={this.handleChange} placeholder="Email" />
                        </div>
                        

            <div className="footer1">
            <Link tabIndex="3" className="text-primary mr-5" onClick={() => this.props.history.goBack()}>Back to Login</Link>
                    <button type="submit" tabIndex="2" className="btn" style={{fontSize:"20px"}}>Send URL</button>
            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </form>
    );
    }
}