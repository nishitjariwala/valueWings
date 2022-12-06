import React from "react";
import {Redirect,Link} from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { decrypt } from "../../Shared/Decryption";

toast.configure()

const validNameRegex = RegExp(
  /^[A-Za-z]{0,20}$/
);

export default class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      f_name: "",
      l_name: "",
      phone_no: "",
      city: "",
      errors: {
        f_name: 'First name is required',
        l_name: 'Last name is required',
        phone_no: 'Phone number is required',
        city: 'City name is required',
      },
      formErr: "",
      done: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  //handle changes on blur and set state
  handleChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    let errors = this.state.errors;
    //validation
    switch (name) {
      case 'phone_no':
        errors.phone_no =  val === '' ? 'Phone number is required' : val.length === 10 ? '' : 'Invalid phone number!';
        break;
      case 'f_name':
          errors.f_name =   val === '' ? 'First name is required' : validNameRegex.test(val) ? '' : 'Invalid first name!';
        break;
      case 'l_name':
        errors.l_name = val === '' ? 'Last name is required' : validNameRegex.test(val) ? '' : 'Invalid last name!';
        break;
      case 'city':
        errors.city =   val === '' ? 'City name is required' : validNameRegex.test(val) ? '' : 'Invalid city name!';
        break;
      default:
        break;
    }

    this.setState({errors,
      [name]: val
    });
  };

  //submit form
  submitForm = async (event) => {
    event.preventDefault();
    if(this.state.errors.phone_no !== '') toast.warn(this.state.errors.phone_no);
    if(this.state.errors.f_name !== '') toast.warn(this.state.errors.f_name);
    if(this.state.errors.l_name !== '') toast.warn(this.state.errors.l_name);
    if(this.state.errors.city !== '') toast.warn(this.state.errors.city)
    
    if(this.state.phone_no !== '' && this.state.f_name !== '' && this.state.l_name !== '' && this.state.city !== ''
    && this.state.errors.phone_no === '' && this.state.errors.f_name === ''&& this.state.errors.l_name === '' && this.state.errors.city === ''){
    
    let check = await this.props.updateProfile(this.state);
    if (check) {
      this.setState({ done: true });
    }
    else
      this.setState({ formErr: "Error while update!" });
    }
    else{
      toast.warn("Please fill valid details!");

    }
    setTimeout(()=>{
      this.setState({formErr:''});
    },2000)
  };

  //get formdata and prefill it
  async componentDidMount() {
    var decoded = JSON.parse(decrypt(this.props.user));
    let data = await this.props.getData(decoded.Id);
    
    await this.setState({
      id: decoded.Id,
      f_name: data.f_name || "",
      l_name: data.l_name || "",
      phone_no: data.phone_no || "",
      city: data.city || "",
    });
    this.setState({errors: {
      f_name: '',
      l_name: '',
      phone_no: '',
      city: '',
    },});
  }

  render() {

    //Updated successfully
    if (this.state.done) {
      return <Redirect to="/Profile"/>
    }
    
    return (
      <div className="container" ref={this.props.containerRef}>
        <div className="col-md-8">
          <div className="form-2">
            <div className="portlet light bordered">
              <div className="portlet-title tabbable-line">
              </div>
              <div className="portlet-body">
                <div className="demo">
                  <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="home">
                      <form className="base-container" onSubmit={this.submitForm}>
                        <div className="form">
                        <div className="form-group">
                          <label htmlFor="inputName">First Name</label>
                          <input
                            type="text"
                            name="f_name"
                            className="form-control"
                            defaultValue={this.state.f_name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputLastName">Last Name</label>
                          <input
                            type="text"
                            name="l_name"
                            className="form-control"
                            defaultValue={this.state.l_name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">City</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            defaultValue={this.state.city}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Phone</label>
                          <input
                            type="text"
                            name="phone_no"
                            className="form-control"
                            defaultValue={this.state.phone_no}
                            onChange={this.handleChange}
                          />
                          
                        </div>
                        <div className="col-12 row">
                        
                        <button type="submit" className="col-4 mr-4 p-1 btn btn-default">
                          Update
                        </button>
                        <Link className="col-4 ml-4 p-1 btn btn-default" to="/Profile">Cancel</Link>
                        </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
