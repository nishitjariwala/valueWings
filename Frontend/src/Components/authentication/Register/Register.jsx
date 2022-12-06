import React from "react";
import registerImg from "../../../Images/register.svg";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure()

//Email Regex
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

//Password Regex 
const validPassRegex = RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
);


export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            cpassword:'',
            email: '',
            errors:{
                password:'Password is required',
                cpassword:'Confirm Password is required',
                email: 'Email is required'
            },
            done:false,
            formError:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    //handele changes on blur and set states
    handleChange = (event) =>{
        let name = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        //validation
        switch(name){
            case 'email' :
                errors.email = val === '' ? 'Email is required' : validEmailRegex.test(val) ? '' : 'Email is not valid!';
                
                break;
            case 'password':
                errors.password = val === '' ? 'Password is required' : val.length > 7 ? validPassRegex.test(val) ? '' : 'password must contains capital letter,number and special character' : 'Password length atleast 8 digit long!';
                
                break;
            case 'cpassword':
                errors.cpassword = val === '' ? 'Confirm Password is required' : val === this.state.password ? '' : 'confirm password must be same as new password!';
                
                break;
            default:
                break;           
        }
        this.setState({errors,[name] : val})
        // this.setState({[name] : val})
    }

    //submit form
    submitForm = async(event) => {
        if(this.state.errors.email !== '') toast.warn(this.state.errors.email) ;
        if(this.state.errors.password !== '') toast.warn(this.state.errors.password) ;
        if(this.state.errors.cpassword !== '') toast.warn(this.state.errors.cpassword) ;
        event.preventDefault();
        if(this.state.email !== '' && this.state.password !== '' && this.state.errors.email === '' && this.state.errors.password === '' && this.state.errors.cpassword === '') {
            
            
            let check = await this.props.postUser(this.state.email,this.state.password);
            if(check.status === 200)
            this.setState({done:true}) 
            else if(check.status === 409){
                this.setState({formError:'User already exists!'}) 
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );   
                }
            else{
                
                let err = check.json();
                this.setState({formError : err.message})
            }
        }
        else{}
            // toast.warn('Please fill vaid details!')  
        if(this.state.formError !== ''){
            toast.error(this.state.formError);
        }
        if(this.state.done){
            toast.success('Mail has been sent, please check your mail-box!');
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            this.setState({
                done:false
            })
            this.props.onClick();
        }
        setTimeout(()=>{
            this.setState({
                formError:''
            })
        },3000);  
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
            <div className="base-container" ref={ this.props.containerRef }>
                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                        <img src={registerImg} alt="Register" />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" tabIndex="1" onBlur={this.handleChange} name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" tabIndex="2" onBlur={this.handleChange} name="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" tabIndex="3" onBlur={this.handleChange} name="cpassword" placeholder="Password" />
                        </div>
                    </div>
                </div>
                {(this.props.isMobile) ? <>Already a user?<p className="text-primary" tabIndex="5" onClick={this.props.onClick}>Back To Login</p></> : <></>}
        
                <div className="footer1">
                <button type="submit" tabIndex="4"  className="btn">Register</button>
                </div>
                </div>
            </form>
        );
    }
}