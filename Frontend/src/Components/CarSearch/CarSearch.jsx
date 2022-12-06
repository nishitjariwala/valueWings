import React,{Component} from 'react';
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure()

const validNumberRegex = RegExp(
  /^[0-9]+$/
);

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state ={ 
          category:'used',
          Makes:[],
          selectedMake:'',
          Models:[],
          selectedModel:'',
          Years:[],
          selectedYear:'',
          Months:[],
          selectedMonth:'',
          Trims:[],
          selectedTrim:'',
          kms:'',
          price:null,
          pageLoad:false
        }
        this.getMakes = this.getMakes.bind(this);
        this.getModels = this.getModels.bind(this);
        this.getYears = this.getYears.bind(this);
        this.getTrims = this.getTrims.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //get Makes
    getMakes = () => {  
      var requestOptions = {
      method: 'GET',
      redirect: 'follow'
      };
  
      return fetch("https://value-wings.herokuapp.com/api/cars/getMake", requestOptions)
      .then((response) => response.json())
      .then((response => response.data.data))
      .catch(error => console.log('error', error));
    }

    //get Model
    getModels = (id) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("Make_id", id);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      
      fetch("https://value-wings.herokuapp.com/api/cars/getModel", requestOptions)
      .then((response) => response.json())
      .then(response => response.data.data)
      .then(response => {
        let Models = response;
        this.setState({
          Models
        })
      })
      .catch(error => console.log('error', error));
    }

    //get Years
    getYears = (make_id,model_id) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("Make_id", make_id);
      urlencoded.append("Model_id", model_id);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      
      fetch("https://value-wings.herokuapp.com/api/cars/getYear", requestOptions)
      .then((response) => response.json())
      .then(response => response.data.data)
      .then(response => {
        let Years = response;
        this.setState({
          Years
        })
      })
      .catch(error => console.log('error', error));
    }

    //get Trims
    getTrims = (make_id,model_id,year_id) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("Make_id", make_id);
      urlencoded.append("Model_id", model_id);
      urlencoded.append("Year_id", year_id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("https://value-wings.herokuapp.com/api/cars/getTrim", requestOptions)
      .then((response) => response.json())
      .then(response => response.data.data)
      .then(response => {
        let Trims = response;
        this.setState({
          Trims
        })
      })
      .catch(error => console.log('error', error));
    }

    //Handle changes
    handleChange = async(e) => {

      let name = e.target.name;
      let val = e.target.value;
      switch(name){
        case "make":
          await this.setState({
            selectedMake:val,
            selectedModel:'',
            Models:[],
            Years:[],
            Months:[],
            Trims:[],
            selectedYear:'',
            selectedTrim:'',
            price:null
            });
          this.getModels(this.state.selectedMake);
          break;

        case "model":
            await this.setState({
            selectedModel:val,
            Years:[],
            Trims:[],
            Months:[],
            selectedYear:'',
            selectedTrim:'',
            price:null
            });
            this.getYears(this.state.selectedMake,this.state.selectedModel)
          break;
        case "year":
          await this.setState({
            selectedYear:val,
            Trims:[],
            Months:[{
              Month_id : "1",
              month:'January'
            },
            { Month_id :"2" ,
              month:'February'
            },{ 
              Month_id : "3", 
              month:'March'
            },{ 
              Month_id :"4", 
              month:'April'
            },{ 
              Month_id :"5" , 
              month:'May'
            },{ 
              Month_id :"6" ,
              month:'June'
            },{ 
              Month_id :"7" , 
              month:'July'
            },{ 
              Month_id :"8" , 
              month:'August'
            },{ 
              Month_id :"9" , 
              month:'September'
            },{ 
              Month_id : "10", 
              month:'October'
            },{ 
              Month_id :"11" , 
              month:'November'
            },{ 
              Month_id :"12" , 
              month:'December'
            }],
            selectedTrim:'',
            price:null
          });
          
          break;
        case "trim":
          await this.setState({
            selectedTrim:val,
            price:null,
            
          });
          break;
        
        case "month":
          await this.setState({
            selectedMonth:val,
            price:null,
            Trims:[]
          });
          this.getTrims(this.state.selectedMake,this.state.selectedModel,this.state.selectedYear)
          break;
        case "kms":
          validNumberRegex.test(val) ? 
          await this.setState({
            kms:val,
            price:null
          })
          :
          toast.warn("Enter kilometers in number!")
          break;
        default:
          break;
      }
    }

    //handle submit
    handleSubmit = (e) => {
  if(e.target.name === "used"){
    if(this.state.selectedMake !== '' && this.state.selectedModel !== '' && this.state.selectedYear !== '' && this.state.selectedTrim !== '' && this.state.selectedMonth !== '' && this.state.kms !== '')
    {
      this.props.setCar(this.state);
      this.props.history.push("/oldcarprice");
    }
    else{
      toast.warn('Please input all the details!');
    }
  }
  else if(e.target.name === "new"){
    if(this.state.selectedMake !== '' && this.state.selectedModel !== '')
    {
      this.props.setCar(this.state);
      this.props.history.push("/newcarprice");
    }
    else{
      toast.warn('Please input all the details!');
    }
  }
}
    async componentDidMount(){
      setTimeout(() =>  this.setState({pageLoad : true}),500)
        let Makes = await this.getMakes();
        this.setState({Makes})
    }
    

    render(){
    
      return(
        <div>
          <div className={this.state.pageLoad ? "pagetitle" : "col-md-12 title pagenotitle"}>
          <div id="carSearch" className="col-md-12 title mt-5">Price Calculator</div>
            </div>
          <div className="container custom-search pt-5 pb-5">
            <div class="col-md-12 row" style={{marginRight:"0px", marginLeft: "0px"}}>
                <div className={this.state.pageLoad ? "col-md-6 p-2 pagebody" : " col-md-6 p-2 pagenobody"}>
                    <button  className={this.state.category === "used" ? "btn-search active1" :" btn-search"} onClick={() => this.setState({category:'used'})} >Used Car</button>
                    </div>
                <div className={this.state.pageLoad ? "col-md-6 p-2 pagecontent" : " col-md-6 p-2 pagenocontent"}>
                  <button  className={this.state.category === "new" ? "btn-search active1" :" btn-search"} onClick={() => this.setState({category:'new'})} >New Car</button>
                </div>                  
            </div>


        {/* for used car */}
        {this.state.category === "used" ?
        <>
        <div className="col-md-1"></div>
        <div className={this.state.pageLoad ? " col-md-3 m-2 pagecontent" : "  col-md-3 m-2 pagenocontent"}>
              <select
                name="make"
                onChange={async(e)=> this.handleChange(e)}>
                <option value="">Select Make</option>
                {this.state.Makes.map((item) => {
                    return <option key={item.make_id} value={item.make_id}>{item.make_name}</option>
                })
                }
                </select>
                <span className="custom-arrow ml-0"></span>
            </div>

            <div className={this.state.pageLoad ? " col-md-3 m-2 pagebody" : "  col-md-3 m-2 pagenobody"}>
              <select
                name="model"
                onChange={async(e)=> this.handleChange(e)}>
                          <option value="">Select Model</option>
                            {this.state.Models.map((item) => {
                                return <option key={item.model_id} value={item.model_id}>{item.model_name}</option>
                            })
                            }
              </select>
              <span className="custom-arrow"></span>
            </div>
            
            
            <div className={this.state.pageLoad ? " col-md-3 m-2 pagecontent" : "  col-md-3 m-2 pagenocontent"}>
            <select
              name="year"
              onChange={async(e)=>  this.handleChange(e)}>
              <option value="">Select Year</option>
                {this.state.Years.map((item) => {
                    return <option key={item.year_id} value={item.year_id}>{item.year}</option>
                })
                }
            </select>
            <span className="custom-arrow"></span>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-1"></div>
            <div className={this.state.pageLoad ? " col-md-3 m-2 pagecontent" : "  col-md-3 m-2 pagenocontent"}>
            <select
              name="month"
              onChange={async(e)=>  this.handleChange(e)}>
              <option value="">Select Month</option>
                {this.state.Months.map((item) => {
                    return <option key={item.Month_id} value={item.Month_id}>{item.month}</option>
                })
                }
            </select>
            <span className="custom-arrow"></span>
            </div>
            
            
            <div className={this.state.pageLoad ? " col-md-3 m-2 pagebody" : "  col-md-3 m-2 pagenobody"}>
              <select
              name="trim"
              onChange={async(e)=> this.handleChange(e) }>
                <option value="">Select Trim</option>
                  {this.state.Trims.map((item) => {
                      return <option key={item.trim_id} value={item.trim_id}>{item.trim_name}</option>
                  })
                  }
              </select>
              <span className="custom-arrow"></span>
            </div>
            
            <div className={this.state.pageLoad ? " col-md-3 m-2 pagecontent" : "  col-md-3 m-2 pagenocontent"}>
              <input type="number" name="kms" style={{color:"#636cff",borderColor:"#636cff"}} placeholder="KMs driven" className="form-control p-4 m-1" onChange={(e)=> this.handleChange(e)}/>
            </div>
            <div className="col-md-1"></div>
            <div className={this.state.pageLoad ? "m-2 col-md-12 pagetitle" : "m-2 col-md-12 pagenotitle"}>
              <button name="used" onClick={(e) => this.handleSubmit(e)} className="btn-search">Get ValueWings</button>
            </div>

      </>          

        :<>
        <div className="col-md-1"></div>
      <div className={this.state.category === "new" ? "mt-2 col-md-4 m-1 pagebody" : "mt-2 col-md-4 m-1 pagenobody"}>
              <select
                name="make"
                onChange={async(e)=> this.handleChange(e)}>
                <option value="">Select Make</option>
                {this.state.Makes.map((item) => {
                    return <option key={item.make_id} value={item.make_id}>{item.make_name}</option>
                })
                }
                </select>
                <span className="custom-arrow ml-0"></span>
            </div>

            <div className={this.state.category === "new" ? "mt-2 col-md-4 m-1 pagecontent" : "mt-2 col-md-4 m-1 pagenocontent"}>
              <select
                name="model"
                onChange={async(e)=> this.handleChange(e)}>
                          <option value="">Select Model</option>
                            {this.state.Models.map((item) => {
                                return <option key={item.model_id} value={item.model_id}>{item.model_name}</option>
                            })
                            }
              </select>
              <span className="custom-arrow"></span>
            </div>
            <div className="col-md-1"></div>              
            <div className={this.state.category === "new" ? "m-2 col-md-12 pagetitle" : "m-2 col-md-12 pagenotitle"}>
              <button name="new" onClick={(e) => this.handleSubmit(e)} className="btn-search">Check Price</button>
            </div>
            <div className="col-md-1"></div>
            </>
          }

          </div>
      </div>
    );
  }
}



