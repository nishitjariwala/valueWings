import React from "react";
import loginImg from "../../../Images/forgot_password.svg";
import {Redirect,Link} from 'react-router-dom';
import Loader from "../../Loader/Loader";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { encrypt } from "../../../Shared/Encryption";

toast.configure()

//paassword Regex
const validPassRegex = RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
)


export default class ForgotPwd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token : new URLSearchParams(this.props.location.search).get("token"),
            newPassword: '',
            confirmPassword:'',
            error:{
                newPassword: '',
                confirmPassword:'',
            },
            done:false,
            loading:false,
            formErr:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.updatePwd = this.updatePwd.bind(this);
    }
    //handle Change onBlur and seState
    handleChange = (event) =>{
        let name = event.target.name;
        let val = event.target.value;
        let errors = this.state.error;
        
        //validation
        switch(name){
            case 'newPassword':
                errors.newPassword = val.length > 7 ? validPassRegex.test(val) ? '' : 'password must contains capital letter,number and special character' : 'Password length atleast 8 digit long!';
                if(errors.newPassword !== '') toast.warn(errors.newPassword) ;
                break;      
            case 'confirmPassword':
                errors.confirmPassword = val === this.state.newPassword ? '' : 'confirm password must be same';
                if(errors.confirmPassword !== '') toast.warn(errors.confirmPassword) ;
                break; 
            default:
                break;
        }
        this.setState({[name] : val})
    }

    //Change Password
    updatePwd = (val) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        //get new token from URL
        let token = new URLSearchParams(this.props.location.search).get("token");
        urlencoded.append("new_password", encrypt(val));
        urlencoded.append("token", token);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch("https://value-wings.herokuapp.com/api/user/forgotPassword", requestOptions)
        .then(response => {
            //password changed
            if(response.status === 205)   
                return true;
            //password not change
            else
                return false;
        }).then(response => {return(response)})
        .catch(error => console.log('error', error));
        }
    
    //Submit new Password
    submitForm = async (event) => {
        event.preventDefault();
        if(this.state.newPassword !== '' && this.state.confirmPassword !== '' & this.state.error.newPassword === '' && this.state.error.confirmPassword === ''){
            let check =await this.updatePwd(this.state.newPassword);
            if(check){
                this.setState({loading : true});
                setTimeout(() => {
                    this.setState({done : true,loading: false})
                },3000)
            }
            else{
                this.setState({formErr : 'Error in changing passwords'});
                toast.error(this.state.formErr);
            } 
        }
        setTimeout(()=>{
            this.setState({
                formErr:''
            })
        },3000);
    }

    render() {
        if(this.state.loading){
            return <Loader/>
        }
        if(this.state.done){
            return <Redirect to="/login"/>
        }
        if(!this.state.token){
            return <Redirect to="/home"/> 
        }
        else{
        return (
            <form onSubmit={this.submitForm}>
            <div className="base-container1" ref={ this.props.containerRef }>
                <div className="header">Forgot Password</div>
                <div className="content">
                    <div className="row">
                    <div className="col-md-6">
                        <div className= "image">
                        <img src={loginImg} className="img" alt="forgot Password" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form">
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" tabIndex="1" name="newPassword" onBlur={this.handleChange} placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" tabIndex="2" name="confirmPassword" onBlur={this.handleChange} placeholder="Password" />
                        </div>                        
                <div className="footer1">
                    <button type="submit" tabIndex="3" className="btn">Reset</button>
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
}