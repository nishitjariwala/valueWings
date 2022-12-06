import React,{Component} from 'react';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import  Home  from "./Home/Home";
import Navibar from "./Navibar/Navbar";
import ChangePassword from "./authentication/ChangePassword/ChangePassword";
import ForgotPassword from "./authentication/ForgotPassword/ForgotPassword";
import ForgotPasswordRedirect from "./authentication/ForgotPasswordRedirect/ForgotPassword";
import Gallery from "./Gallery/Gallery";
import  Auth  from "./authentication/AuthComponent";
import Profile from "./Profile/Profile";
import Compare from "./Compare/Compare";
import {connect} from 'react-redux';
import {postUser} from '../Redux/ActionCreator/RegistrationActions';
import {checkUser,loginUser,logoutUser } from '../Redux/ActionCreator/LoginActions';
import { getData,updateProfile } from '../Redux/ActionCreator/UserDataActions';
import {changePwd } from '../Redux/ActionCreator/PasswordChangeActions';
import { fetchNews } from '../Redux/ActionCreator/NewsActions';
import { setCar } from "../Redux/ActionCreator/CarSelectedActions";
import {  fetchMake, fetchModel } from '../Redux/actionCreator';
import ErrorPage from './Error/Error';
import OldCarPrice from './CarPrice/OldCarPrice';
import NewCarPrice from './CarPrice/NewCarPrice';
import Footer  from './Footer/Footer';
import AboutUs from "./AboutUs/AboutUs";
import Search from './CarSearch/CarSearch';
import Faqs from './Faqs/Faqs';
import { decrypt } from '../Shared/Decryption';
import ProtectedRoute from './ProtectedRoute';

const mapStateToProps = state =>{
    return{
        Users : state.Users,
        News : state.News,
        Cars : state.Cars,
        selected : state.Selected
    }
}
const mapDispatchtoProps = (dispatch) => ({
    //post UserData
    postUser : (userName,password,email) => dispatch(postUser(userName,password,email)),
    //Login User
    checkUser : (email,password) => dispatch(checkUser(email,password)),
    //Get UserData
    getData : (id) => dispatch(getData(id)),
    //Change Password
    changePwd : (id) => dispatch(changePwd(id)),
    //Update Profile
    updateProfile : (new_profile) => dispatch(updateProfile(new_profile)),
    //Default Login if token set
    loginUser: (token) => dispatch(loginUser(token)),
    //logout user
    logoutUser : () => dispatch(logoutUser()),
    //fetch NEWS
    fetchNews : () => dispatch(fetchNews()),
    //fetch car Make
    fetchMake : () => dispatch(fetchMake()),
    //fetch car Model
    fetchModel : (id) => dispatch(fetchModel(id)),
    //set car
    setCar : (selected) => dispatch(setCar(selected)),
})

//verify token
const verifyToken = (token) => {
    if(token){
        let decoded = JSON.parse(decrypt(token));
        if(decoded.Id){
            
        }
        else{
            
            this.props.logout();
        }
    }
   
}

class Main extends Component{
    //check if User token is set in localstorage
    componentDidMount(){
        this.props.fetchNews();
        // const token = getToken();
        //  if(token)
        //     this.props.loginUser(token);
        // else
        //     this.props.logoutUser();
    }
    render(){

        return(
            <div className="fluid-container" style={{ backgroundColor: "#ffffff",hight:"100%"}}>
            <Navibar isLoggedIn={this.props.Users.isLoggedIn} history={this.props.history} logoutUser={this.props.logoutUser}/>
            <div>
                {
                <Switch location={this.props.location}>
                <Route exact path="/" component={()=>   <Home isLoggedIn={this.props.Users.isLoggedIn} news={this.props.News.news} setCar={this.props.setCar} history={this.props.history}/>}/>
                <Route path="/carsearch" component={()=> <Search setCar={this.props.setCar} history={this.props.history} isLoggedIn={this.props.Users.isLoggedIn}/>}/>
                <ProtectedRoute isAuthenticated={this.props.Users.isLoggedIn} path="/profile" component={() => <Profile history={this.props.history} user={this.props.Users.user} getData={this.props.getData} updateProfile={this.props.updateProfile}/>}/>
                <ProtectedRoute isAuthenticated={this.props.Users.isLoggedIn} path="/changepassword" component={() => <ChangePassword user={this.props.Users.user} history={this.props.history} changePwd= {this.props.changePwd}/>}/>
                <ProtectedRoute isAuthenticated={this.props.Users.isLoggedIn} path="/oldcarprice" component={() => <OldCarPrice clearDetails={this.props.clearDetails} history={this.props.history} selected={this.props.selected} user={this.props.Users.user}/>}/>
                <ProtectedRoute isAuthenticated={this.props.Users.isLoggedIn} path="/newcarprice" component={() => <NewCarPrice selected={this.props.selected} history={this.props.history} user={this.props.Users.user}/>}/>
                <ProtectedRoute isAuthenticated={this.props.Users.isLoggedIn} path="/compare" component={() => <Compare selected={this.props.selected} history={this.props.history} user={this.props.Users.user}/>}/>
                <ProtectedRoute isAuthenticated={this.props.Users.isLoggedIn} path="/gallery" component={() => <Gallery history={this.props.history}  selected={this.props.selected} user={this.props.Users.user}/>}/>
                <Route path="/error" component={() => <ErrorPage/>}/>
                <Route path="/aboutus" component={()=> <AboutUs/>}/>
                <Route path="/faqs" component={()=> <Faqs/>}/>
                <Route path="/login" component={() => <Auth location={this.props.location} history={this.props.history} postUser={this.props.postUser} checkUser={this.props.checkUser}/>}/>
                <ProtectedRoute isNotAuthenticated={!this.props.Users.isLoggedIn} path="/forgotpassword" component={() => <ForgotPassword history={this.props.history}/>}/>
                <ProtectedRoute isNotAuthenticated={!this.props.Users.isLoggedIn} path="/forgotpasswordredirect" component={() => <ForgotPasswordRedirect location={this.props.location} />}/>
                <Redirect to="/"/>
                </Switch>
                }
                </div>
                <Footer/>
            </div>

        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchtoProps)(Main));
