/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Devicelist from "./devicelist.js";
import Devicetree from "./devicetree.js";
import "./main.css";
import Bg from "../img/bg.jpg";
import Building from "../img/8.jpg";
import Logo from "../img/logo.png";
import Btn from "../img/7.png";
import Config from "../env/config";
import { Select, InputNumber } from 'antd';
import {set_device,set_showmodel,set_selectmainform, set_formdata, set_curbom} from '../actions';
import Device from '../data/device';
import _ from 'lodash';

let resizetimecontent = null;
let formchangetime = null;

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            innerHeight: window.innerHeight,
            formdata : {},
        };
    }

    componentWillMount() {
        this.props.dispatch(set_selectmainform({key:'SL',value:'500'}));
        if(!!this.props.formdata){
            this.setState({formdata: {...this.props.formdata} });
        }else{
        this.setState({formdata:{SL:null,J_TN:null,J_TP:null,J_SS:null,C_TN:null,C_TP:null,C_SS:null,NUM:0}});
        }
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

    runstart=()=>{
        this.props.history.push("/mainform");
    }

    inputchange=(e, v)=>{
        const { SL, J_TN, J_TP, J_SS, C_TN, C_TP, C_SS } = this.state.formdata;
        let vv = e;
        let vt = v;
        let formdatas = this.state.formdata;
        formdatas[vt] = vv;
        console.log(formdatas);
        this.setState({formdata : formdatas});
        window.clearTimeout(formchangetime);
        formchangetime=window.setTimeout(()=>{
            if(!!J_SS && !!J_TP && !!SL && !!J_TN && !!C_TN && !!C_SS){
                let mathopt = J_SS/J_TP;
                if(mathopt<20 && mathopt >10){
                    formdatas.NUM = Math.ceil(((J_TN-C_TN)+(0.3*(J_SS-C_SS)))*SL/375.1);
                }else{
                    formdatas.NUM = Math.ceil(((J_TN-C_TN)+(0.7*(J_SS-C_SS)))*SL/375.1);
                }
            }else{
                formdatas.NUM = 0;
            }
            this.setState({formdata : formdatas});
        },1000)
    }

    subform=()=>{
        const { SL, J_TN, J_TP, J_SS, C_TN, C_TP, C_SS } = this.state.formdata;
        // console.log(Device.devicelist);
        if( J_TP <= 1.5 && J_SS <= 30 && J_TN <= 30 ){
            alert("很遗憾，该配置下暂无相应装备！！！");
        }else{
            let curdevice = _.find(Device.devicelist, (o)=>{
                let data_SL = o.SL;
                let data_TN = o.J_TN;
                let data_TP = o.J_TP;
                let data_SS = o.J_SS;
                return (
                    SL >= data_SL[0] && SL <= data_SL[1] &&
                    J_TN >= data_TN[0] && J_TN <= data_TN[1] &&
                    J_TP >= data_TP[0] && J_TP <= data_TP[1] &&
                    J_SS >= data_SS[0] && J_SS <= data_SS[1]
                )
            })
            if(!!curdevice){
                this.props.dispatch(set_device(curdevice));
                this.props.dispatch(set_showmodel(curdevice.id));
                this.props.dispatch(set_formdata(this.state.formdata));
                this.props.dispatch(set_curbom(curdevice.name));
                this.props.history.push("/deviceinfo");
            }else{
                alert("很遗憾，该配置下暂无相应装备！！！");
            }
        }
        
    }

    showdemo=(v)=>{
        let model = "";
        if(v=="1"){ model = "hengxiangpailie";}
        if(v=="2"){ model = "zongxiangpailie";}
        this.props.dispatch(set_showmodel(model));
        this.props.history.push(`/showstyle/${v}`);
    }

    render() {
        return (
            <div 
                className="indexPage AppPage"
                style={{ height : `${this.state.innerHeight}px` }}
                >
                <div className="headcontent">
                    <div>
                        <img src={Logo} width="80"/>
                        <span className="title">模块化滤池（异养）处理系统V1.0</span>
                    </div>
                    
                </div>
                <div className="maincontent">
                    <div className="SL_form">
                        <div className="SL_1">水处理量：</div>
                        <div className="SL_2">
                            
                            <InputNumber 
                                type="number"
                                onChange={(e)=>{this.inputchange(e,"SL")}}
                                placeholder="请输入水处理量"
                                />
                            <i>mg/L</i>
                        </div>
                    </div>
                    <div className="mainform">
                        
                        <div className="f1 f">
                            <div className="f1_left">
                                进水(水质参数输入)
                            </div>
                            <div className="f1_center">
                                <div className="tit">水质参数输入</div>
                                <div className="form">
                                    <div><span>TN</span>
                                        <InputNumber 
                                            type="number"
                                            onChange={(e)=>{this.inputchange(e,"J_TN")}}
                                            placeholder="请输入进水TN"
                                            /><i>mg/L</i></div>
                                    <div><span>TP</span>
                                    <InputNumber 
                                            type="number"
                                            onChange={(e)=>{this.inputchange(e,"J_TP")}}
                                            placeholder="请输入进水TP"
                                            /><i>mg/L</i></div>
                                    <div><span>SS</span>
                                        <InputNumber 
                                            type="number"
                                            onChange={(e)=>{this.inputchange(e,"J_SS")}}
                                            placeholder="请输入进水SS"
                                            /><i>mg/L</i></div>
                                </div>
                            </div>
                            <div className="f1_right">
                                <div className="tit">标准值</div>
                                <div className="formdata">
                                    <div>230m<sup>3</sup>/d</div>
                                    <div>230m<sup>3</sup>/d</div>
                                    <div>230m<sup>3</sup>/d</div>
                                </div>
                            </div>
                        </div>
                        <div className="f1 f2">
                            <div className="f1_left">
                                出水(标准限值输入)
                            </div>
                            <div className="f1_center">
                                <div className="tit">出水参数输入</div>
                                <div className="form">
                                    <div><span>TN</span>
                                        <InputNumber 
                                            type="number"
                                            onChange={(e)=>{this.inputchange(e,"C_TN")}}
                                            placeholder="请输入出水TN"
                                            />
                                            <i>mg/L</i></div>
                                    <div><span>TP</span>
                                        <InputNumber 
                                            type="number"
                                            onChange={(e)=>{this.inputchange(e,"C_TP")}}
                                            placeholder="请输入出水TP"
                                            />
                                            <i>mg/L</i></div>
                                    <div><span>SS</span>
                                        <InputNumber 
                                            type="number"
                                            onChange={(e)=>{this.inputchange(e,"C_SS")}}
                                            placeholder="请输入出水SS"
                                            />
                                            <i>mg/L</i></div>
                                </div>
                            </div>
                            <div className="f1_right">
                                <div className="tit">标准值</div>
                                <div className="formdata">
                                    <div>230m<sup>3</sup>/d</div>
                                    <div>230m<sup>3</sup>/d</div>
                                    <div>230m<sup>3</sup>/d</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnlist">
                        <div onClick={()=>{this.showdemo("1")}}>模块化滤池横向展示</div>
                        <div onClick={()=>{this.showdemo("2")}}>模块化滤池纵向展示</div>
                    </div>
                    <div className="pagevalue">计算输出模块化滤池数： {this.state.formdata.NUM}个</div>
                    <div className="showbtn" >
                        <span onClick={this.subform}>确定 | 开始展示</span>
                    </div>
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = ({data:{formdata}}) => {
    if(!!formdata){

    }
    return {formdata};
}
export default connect()(Page);