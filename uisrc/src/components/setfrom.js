/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './setfrom.css';
import { Select } from 'antd';
import Titimg from "../img/10.jpg";
import _ from 'lodash';
import {set_showmodel} from '../actions';
import Devicedata from '../data/device';
import Showcad from './showcad';

const Option = Select.Option;

let resizetimecontent = null;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth: window.innerWidth,
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
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
            });
        }, 10)
    }

    selshowmodel=(v)=>{
        // console.log(v);
        this.props.dispatch(set_showmodel(v));
    }

    render() {
        const { device, showmodel,formdata } = this.props;
        const { FeiShui, COD, AD, SS, PH, BOD5, ZYJT, ZL, ZX, ZQHW, ZLS, ZYD } = formdata;
        console.log(device);
        console.log("Devicedata");
        console.log(Devicedata);
        return (
            <div className="setfromPage" style={{width: `${this.state.innerWidth*.24-40}px`}}>
                <div className="showformdata">
                    <div className="title">
                        <img src={Titimg} />
                    </div>
                    {   !!device &&
                        <div className="setfrom">
                            <div className="li">
                                <span className="sb">
                                    <i>废</i>
                                    <i>水</i>
                                    <i>处</i>
                                    <i>理</i>
                                    <i>量</i>
                                </span>
                                <span>{FeiShui} <b> t/d</b></span>
                            </div>
                            <div className="li"><span>COD<sub>Cr</sub></span><span>{COD} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>氨</i>
                                    <i>氮</i>
                                </span>
                                <span>{AD} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>悬</i>
                                    <i>浮</i>
                                    <i>物</i>
                                </span>
                                <span>{SS} <b> mg/L</b></span>
                            </div>
                            <div className="li"><span>pH值</span><span>{PH} <b> </b></span></div>
                            <div className="li"><span>BOD<sub>5</sub></span><span>{BOD5} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>总</i>
                                    <i>有</i>
                                    <i>机</i>
                                    <i>碳</i>
                                </span>
                                <span>{ZYJT} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>总</i>
                                    <i>磷</i>
                                </span>
                                <span>{ZL} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>总</i>
                                    <i>锌</i>
                                </span>
                                <span>{ZX} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>总</i>
                                    <i>氰</i>
                                    <i>化</i>
                                    <i>物</i>
                                </span>
                                <span>{ZQHW} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>硫</i>
                                    <i>酸</i>
                                    <i>盐</i>
                                </span>
                                <span>{ZLS} <b> mg/L</b></span></div>
                            <div className="li">
                                <span className="sb">
                                    <i>盐</i>
                                    <i>度</i>
                                </span>
                                <span>{ZYD} <b> mg/L</b></span></div>
                        </div>
                    }
                </div>
                <div className="leftshowcad" style={{height: `${this.state.innerWidth*.24-40}px`}}>
                    <Showcad size={this.state.innerWidth*.24-40} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({data:{showmodel,device,formdata}}) => {
    return {showmodel, device, formdata};
}
export default connect(mapStateToProps)(Page);