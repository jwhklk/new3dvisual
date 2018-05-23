/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './showcad.css';
import Device from '../data/device';
import Closefull from "../img/16.jpg";
import Openfull from "../img/17.jpg";
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
import _ from "lodash";

let resizetimecontent = null;
let swiperOptions = {
    navigation: true,
    pagination: true,
    scrollBar: false
};

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showbig : false,
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth
        };
    }
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimecontent);
        resizetimecontent = window.setTimeout(()=>{
            this.setState({
                innerHeight: window.innerHeight,
                innerWidth: window.innerWidth
            });
        }, 10)
    }
    
    showbig=()=>{
        this.setState({showbig: true});
    }

    hidebig=()=>{
        this.setState({showbig: false});
    }

    render() {
        
        const { showmodel } = this.props;
        const imglist = Device.cad[showmodel];
        // console.log("!!!!!!");
        console.log(imglist);

        return (
            <div className="showcadPage" style={{height: `${this.props.size}px`}}>
                <div className="showcad">
                    <img src={Openfull} className="showbig" onClick={this.showbig} />
                    { 
                        !this.state.showbig && 
                        <Swiper
                            swiperOptions={{
                                slidesPerView: 'auto',
                                initialSlide : 0,
                            }}
                            {...swiperOptions}
                            style={{width:`${this.props.size}px`}}
                            >
                            {
                                _.map(imglist, (v,i)=>{
                                    return (
                                        <Slide
                                            className="Demo-swiper__slide"
                                            key={i}
                                            style={{textAlign: "center", width:`${this.props.size}px`,height:`${this.props.size}px`}}
                                            >
                                            <img src={`img/${v}.jpg`} style={{maxHeight: `${this.props.size}px`}}/>
                                        </Slide>
                                    );
                                })
                            }
                        </Swiper>
                    }
                </div>
                { 
                    this.state.showbig && 
                    <div className="showcadbig">
                        <div className="showcad">
                            <img src={Closefull} className="hideshowbig" onClick={this.hidebig} />
                            <Swiper
                                swiperOptions={{
                                    slidesPerView: 'auto',
                                    initialSlide : 0,
                                }}
                                {...swiperOptions}
                                >
                                {
                                    _.map(imglist, (v,i)=>{
                                        return (
                                            <Slide
                                                className="Demo-swiper__slide"
                                                key={i}
                                                style={{width: `${this.state.innerWidth-40}px`,height: `${this.state.innerHeight-40}px`,textAlign: "center"}}
                                                >
                                                <img src={`img/${v}.jpg`} style={{maxHeight: `${this.state.innerHeight-40}px`}} />
                                            </Slide>
                                        );
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                }

            </div>
        );
    }
}
const mapStateToProps = ({data:{showmodel}}) => {
    return { showmodel };
}
export default connect(mapStateToProps)(Page);