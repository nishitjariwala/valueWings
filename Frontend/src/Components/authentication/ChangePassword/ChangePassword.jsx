import React from "react";
import loginImg from "../../../Images/change_password.svg";
import "./changePassword.scss";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { Redirect,Link } from "react-router-dom";
import { decrypt } from "../../../Shared/Decryption";

toast.configure()

const validPassRegex = RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
)


export default class ChangePwd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            oldPassword:'',
            newPassword: '',
            confirmPassword:'',
            formErr:'',
            done:false,
            error:{
            oldPassword:'Old password is required',
            newPassword: 'New password is required',
            confirmPassword:'Confirm password is required',
            
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    //handle change onChange and set state
    handleChange = (event) =>{
        
        let name = event.target.name;
        let val = event.target.value;
        let error = this.state.error;
        
        //validation
        switch(name){
            case 'oldPassword' :
                error.oldPassword = error.oldPassword =  val === '' ? 'Old password is required' : val.length > 7 ? validPassRegex.test(val) ? '' : 'Old password must contains capital letter,number and special character' : 'Old password length atleast 8 digit long!';
                break;
            case 'newPassword':
                    error.newPassword = error.newPassword =  val === '' ? 'New password is required' :val.length > 7 ? validPassRegex.test(val) ? val !== this.state.oldPassword ? '' : 'Old password and new password are not be same!' : 'New password must contains capital letter,number and special character' : 'New password length atleast 8 digit long!'; 
                break; 
            case 'confirmPassword':
                error.confirmPassword = error.confirmPassword =  val === '' ? 'Confirm password is required' : val === this.state.newPassword ? '' : 'Confirm password must be same as new password!';
                break;
            default:
                break;            
        }

        this.setState({error,[name] : val})
    }

    //Submit form
    submitForm = async (event) => {
        if(this.state.error.oldPassword !== '') toast.warn(this.state.error.oldPassword) ;
        if(this.state.error.newPassword !== '') toast.warn(this.state.error.newPassword) ;
        if(this.state.error.confirmPassword !== '') toast.warn(this.state.error.confirmPassword) ;
        event.preventDefault();   
        if(this.state.oldPassword !== '' && this.state.newPassword !== '' && this.state.confirmPassword !== '' && this.state.error.oldPassword === '' && this.state.error.newPassword === '' && this.state.error.confirmPassword === ''){           
            //decode Token to id
            let decoded =await JSON.parse(decrypt(this.props.user));
            
            let obj = {
                id : decoded.Id,
                old_password : this.state.oldPassword,
                new_password : this.state.newPassword
            }
            
            let check =await this.props.changePwd(obj);
            if(check){
                this.setState({done:true})
                toast.success('Password changed successfully')
                }    
                else
                this.setState({formErr:'Your old password is incorrect.!',done:false})
        }
        
        if(this.state.formErr !== ''){
            toast.error(this.state.formErr)      
        }
        setTimeout(()=>{
            this.setState({
                formErr:'',
            })
        },3000);
    
    }

    render() {

        //on successfully changed password
        if(this.state.done)
            return <Redirect to="Profile"/>
        
        return (
            <form onSubmit={this.submitForm}>
            <div className="base-container1" ref={ this.props.containerRef }>
                <div className="header">Change Password</div>
                <div className="content">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="image">
                        <img src={loginImg} className="img" alt="forgot Password" />
                        </div>
                    </div>
                    <div className="col-md-6 form">
                        <div className="form-group">
                            <label htmlFor="oldPassword">Old Password </label>
                            <input type="password" tabIndex="1" name="oldPassword" onBlur={this.handleChange} placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" tabIndex="2" name="newPassword" onBlur={this.handleChange} placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" tabIndex="3" name="confirmPassword" onBlur={this.handleChange} placeholder="Password" />                            
                        </div>
                        <div className="footer1">
                            <Link tabIndex="5" className="text-primary m-3" onClick={() => this.props.history.goBack()}>  Back to Profile</Link>
                            <button type="submit" tabIndex="4" className="btn" style={{fontSize:"20px"}}>Change</button>
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
        </form>
        );
    }
}