/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Bomlist from './bomlist';
import Show3d from './show3d';
import Setfrom from './setfrom';
import Navtitle from './navtitle';
import "./index.css";
import Device from '../data/device';
import Logo from "../img/logo.png";
let resizetimecontent = null;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerHeight: window.innerHeight
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
                innerHeight: window.innerHeight
            });

        }, 10)
    }
    render() {
        const curbom = Device.bomdata[this.props.curbom];
        console.log(curbom);
        return (
            <div
                className="indexPage  AppPage"
                style={{ height : `${this.state.innerHeight}px`,overflow:"hidden" }}
                >
                <div className="headcontent">
                    <div>
                        <img src={Logo} width="80"/>
                        <span className="title">模块化滤池（异养）处理系统V1.0</span>
                    </div>
                    
                </div>
                <div className="cont deviceinfoPage">
                    <div className="show_bom_left">
                        <div className="bom">
                            <div className="tt">参数</div>
                            <div className="dd">
                                <div className="li"><span>外加碳源(70%)</span><span>{Device.bomdata[this.props.curbom][0]}Kg</span></div>
                                <div className="li"><span>厨余垃圾消化液碳源(25%)</span><span>{Device.bomdata[this.props.curbom][1]}Kg</span></div>
                                <div className="li"><span>酒糟碳源(5%)</span><span>{Device.bomdata[this.props.curbom][2]}Kg</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="show_3d">
                        <Show3d history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({data:{curbom}}) => {
    return {curbom};
}
export default connect(mapStateToProps)(Page);
