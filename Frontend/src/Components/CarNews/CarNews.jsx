import React,{Component}  from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-bootstrap';
import Loader from '../Loader/Loader'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default class carNews extends Component{
    constructor(props){
        super(props);
        this.state = {
            newsArray:[],
            isMobile: window.innerWidth > 768 ? false :true
    }

    this.handleResize = this.handleResize.bind(this);
    }
    handleResize = (e) => {
        this.setState({ isMobile: window.innerWidth > 768 ? false :true });
    };

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }

    async componentDidMount(){
        window.addEventListener("resize", this.handleResize);
        let array = await this.props.news;
        const newsArray = [];
        if(array)
        for (let i = 0; i < array.length-1 ;) {
            let temp = []    
            for(let j=0;j<3;j++){
                if(i<array.length){
                    if(array[i].content.length==0)
                        console.log(array[i++].content.length==0)
                    else
                        temp.push(array[i++]);
                }    
            }
            if(temp.length === 3)
                newsArray.push(temp);
        }
    this.setState({newsArray})
    }
    render(){        
        return(
            this.state.newsArray.lengh === 0 ?
                <Loader/>
                :
                !this.state.isMobile ?
            <Carousel prevIcon={<FontAwesomeIcon icon={faAngleLeft} color="#ffffff" size="5x" />} nextIcon={<FontAwesomeIcon icon={faAngleRight} color="#ffffff" size="5x" />} indicators={false} className="fluid-container bg-secondary" >
                {           
                this.state.newsArray.map((item) => {
                    return(
                    <Carousel.Item interval={5000}>
                    <div className="col-sm-12 row p-4 pb-5 justify-content-center" style={{height:"500px"}}> 
                    <div className="col-sm-3 ml-5 mt-2 mb-2 card h-100" >
                        <div className="card-body" style={{"overflow":"hidden"}}>
                        {ReactHtmlParser(item[0].content)}
                        </div>
                        <a className="text-center pb-2" style={{color:'#636cff'}} target="_new" href={item[0].link}>Read More</a>
                    </div>
                    <div className="col-sm-3 ml-5 mt-2 mb-2 card h-100 " >
                        <div className="d-sm-none d-md-block card-body" style={{"overflow":"hidden"}}>
                        {ReactHtmlParser(item[1].content)}
                        
                        </div>
                        <a className="text-center pb-2" style={{color:'#636cff'}} target="_new" href={item[1].link}>Read More</a>
                    </div>
                    <div className="col-sm-3 ml-5 mt-2 mb-2 card h-100 " >
                        <div className="d-sm-none d-md-block card-body" style={{"overflow":"hidden"}}>
                        {ReactHtmlParser(item[2].content)}
                        
                        </div>
                        <a className="text-center pb-2" style={{color:'#636cff'}} target="_new" href={item[2].link}>Read More</a>
                    </div>
                    </div>
                </Carousel.Item>
                    );
                })}
            </Carousel>
            
            
            :

            this.props.news === null ? <></> :
            <Carousel prevIcon={<FontAwesomeIcon icon={faAngleLeft} color="#ffffff" size="5x" />} nextIcon={<FontAwesomeIcon icon={faAngleRight} color="#ffffff" size="5x" />} indicators={false} className="fluid-container bg-secondary" >
                {           
                this.props.news.map((item) => {
                    return(
                    <Carousel.Item interval={5000}>
                        <div className="col-sm-12 row p-4 pb-5 justify-content-center" style={{height:"500px"}}> 
                            <div className="col-sm-8 ml-5 mt-2 mb-2 card h-100" >
                                <div className="card-body" style={{"overflow":"hidden"}}>
                                    {ReactHtmlParser(item.content)}
                                </div>
                                <a className="text-center pb-2" style={{color:'#636cff'}} target="_new" href={item.link}>Read More</a>
                            </div>
                        </div>
                    </Carousel.Item>
                                    );
                                })}
            </Carousel>
        );
    }
}