/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Devicelist from "./devicelist.js";
import Devicetree from "./devicetree.js";
import "./mainform.css";
import Bg from "../img/bg.jpg";
import Title from "../img/9.jpg";
import Config from "../env/config";
import 'antd/dist/antd.css';
import { Select, InputNumber } from 'antd';
import {set_device,set_showmodel,set_selectmainform, set_formdata} from '../actions';
import Device from '../data/device';
import _ from 'lodash';

const Option = Select.Option;
let resizetimecontent = null;

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            innerHeight: window.innerHeight,
            formdata : {}
        };
    }
    
    componentWillMount() {
        this.props.dispatch(set_selectmainform({key:'SL',value:'500'}));
        //this.props.formdata;
        this.setState({formdata: {...this.props.formdata} });
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

    sl_change=(v)=>{
        // this.setState({SL: v});
        this.props.dispatch(set_selectmainform({key:'SL',value:v}));
    }

    cod_change=(v)=>{
        // this.setState({COD: v});
        this.props.dispatch(set_selectmainform({key:'COD',value:v}));
    }

    ad_change=(v)=>{
        // this.setState({AD: v});
        this.props.dispatch(set_selectmainform({key:'AD',value:v}));
    }

    ss_change=(v)=>{
        // this.setState({SS: v});
        this.props.dispatch(set_selectmainform({key:'SS',value:v}));
    }

    inputchange=(e, v)=>{
        // console.log(e);
        // console.log(v);
        let vv = e;
        let vt = v;
        
        //最大值最小值控制
        // if(vt ==="COD"){
        //     if(parseInt(vv)<1000){ document.getElementById("COD").value = 1000; }
        //     if(parseInt(vv)>30000){ document.getElementById("COD").value = 30000; }
        // }
        // if(vt ==="AD"){
        //     if(parseInt(vv)<30){ document.getElementById("AD").value = 30; }
        //     if(parseInt(vv)>500){ document.getElementById("AD").value = 500; }
        // }
        // if(vt ==="SS"){
        //     if(parseInt(vv)<100){ document.getElementById("SS").value = 100; }
        //     if(parseInt(vv)>4000){ document.getElementById("SS").value = 4000; }
        // }
        let formdatas = this.state.formdata;
        formdatas[vt] = vv;
        console.log(formdatas);
        this.setState({formdata : formdatas});
    }

    subform=()=>{
        const {selected_sl,selected_cod,selected_ad,selected_ss} = this.props;
        const {FeiShui, COD, AD, SS} = this.state.formdata;

        let curdevice = _.find(Device.devicelist, (o)=>{
            let SL_max = parseInt(o["水处理量"]);
            let SL_min = 0;
            if(SL_max==500){ SL_min = 0};
            if(SL_max==1000){ SL_min = 500};
            if(SL_max==3000){ SL_min = 1000};
            let COD_min = parseInt(o["COD"].split("~")[0]);
            let COD_max = parseInt(o["COD"].split("~")[1]);
            let AD_min = parseInt(o["氨氮"].split("~")[0]);
            let AD_max = parseInt(o["氨氮"].split("~")[1]);
            let SS_mix = parseInt(o["SS"].split("~")[0]);
            let SS_max = parseInt(o["SS"].split("~")[1]);
            return (
                FeiShui > SL_min && FeiShui <= SL_max &&
                COD >= COD_min && COD < COD_max &&
                AD >= AD_min && AD < AD_max &&
                SS >= SS_mix && SS < SS_max
            )
        })
        if(!!curdevice){
            this.props.dispatch(set_device(curdevice));
            this.props.dispatch(set_showmodel(curdevice.id));
            this.props.dispatch(set_formdata(this.state.formdata));
            this.props.history.push("/deviceinfo");
        }else{
            alert("很遗憾，该配置下暂无相应装备！！！");
        }
    }

    render() {
        const {
            options_cod,
            options_ad,
            options_ss,
            selected_sl,
            selected_cod,
            selected_ad,
            selected_ss} = this.props;

        let OP_COD = [];
        let OP_AD = [];
        let OP_SS = [];
        // const { FeiShui, COD, AD, SS, PH, BOD5, ZYJT, ZL, ZX, ZQHW, ZLS, ZYD } = this.props.formdata;
        _.map(options_cod,(v,index)=>{
            OP_COD.push(<Option key={`cod${index}`} value={v}>{v}</Option>);
        });

        _.map(options_ad,(v,index)=>{
            OP_AD.push(<Option key={`ad${index}`} value={v}>{v}</Option>);
        });

        _.map(options_ss,(v,index)=>{
            OP_SS.push(<Option key={`ss${index}`} value={v}>{v}</Option>);
        });

        return (
            <div
                className="indexPage AppPage"
                style={{
                    height : `${this.state.innerHeight}px`,
                    background : "#EEE"
                }}
                >
                <img src={Bg} style={{width: "100%", height: `${this.state.innerHeight}px`}} />
                <div className="maincontent">
                    <div className="mainwamp mainformwamp">
                        <img src={Title} className="title" />
                        <div className="cont">
                            <div className="formc">
                                <div className="form">
                                    <div className="tit">进水水质参数</div>
                                    <div className="li">
                                        <span className="sb">
                                            <i>废</i>
                                            <i>水</i>
                                            <i>处</i>
                                            <i>理</i>
                                            <i>量</i>
                                        </span>
                                        <InputNumber 
                                            type="number" 
                                            max={3000} id="FeiShui" 
                                            onChange={(e)=>{this.inputchange(e,"FeiShui")}} 
                                            data-type="FeiShui" style={{ width: 130 }} 
                                            placeholder=""
                                            defaultValue={this.props.formdata.FeiShui}
                                            />
                                        <span>t/d</span>
                                    </div>
                                    <div className="li">
                                        <span>COD<sub>Cr</sub></span>
                                        <InputNumber 
                                            type="number" max={30000} 
                                            min={1000} id="COD" onChange={(e)=>{this.inputchange(e,"COD")}} 
                                            data-type="COD" style={{ width: 130 }} 
                                            placeholder="" 
                                            defaultValue={this.props.formdata.COD}
                                            />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">
                                        <span className="sb">
                                            <i>氨</i>
                                            <i>氮</i>
                                        </span>
                                        <InputNumber 
                                            type="number" min={30} 
                                            max={500} id="AD" onChange={(e)=>{this.inputchange(e,"AD")}} 
                                            data-type="AD" 
                                            style={{ width: 130 }} 
                                            placeholder="" 
                                            defaultValue={this.props.formdata.AD}
                                            />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">
                                        <span className="sb">
                                            <i>悬</i>
                                            <i>浮</i>
                                            <i>物</i>
                                        </span>
                                        <InputNumber 
                                            type="number" 
                                            min={100} max={4000} 
                                            id="SS" 
                                            onChange={(e)=>{this.inputchange(e,"SS")}} 
                                            data-type="SS" 
                                            style={{ width: 130 }}
                                            defaultValue={this.props.formdata.SS}
                                            placeholder="" />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">
                                        <span>pH</span>
                                        <InputNumber
                                            type="number"
                                            style={{ width: 130 }}
                                            onChange={(e)=>{this.inputchange(e,"PH")}}
                                            placeholder=""
                                            defaultValue={this.props.formdata.PH}
                                            data-type="PH"
                                            />
                                        <span></span>
                                    </div>
                                    <div className="li">
                                        <span>BOD<sub>5</sub></span>
                                        <InputNumber
                                            type="number"
                                            style={{ width: 130 }}
                                            onChange={(e)=>{this.inputchange(e,"BOD5")}}
                                            placeholder=""
                                            defaultValue={this.props.formdata.BOD5}
                                            data-type="BOD5"
                                            />
                                        <span>mg/L</span>
                                    </div>
                                </div>
                                <div className="bz">
                                    <div className="tit">污染物排放标准</div>
                                    <div className="li"><span>--</span></div>
                                    <div className="li"><span>60</span><span>mg/L</span></div>
                                    <div className="li"><span>120</span><span>mg/L</span></div>
                                    <div className="li"><span>35</span><span>mg/L</span></div>
                                    <div className="li"><span>6~9</span></div>
                                    <div className="li"><span>40</span><span>mg/L</span></div>
                                </div>
                                <div className="form form2">
                                    <div className="tit">进水水质参数</div>
                                    <div className="li">
                                        <span className="sb">
                                            <i>总</i>
                                            <i>有</i>
                                            <i>机</i>
                                            <i>碳</i>
                                        </span>
                                        <InputNumber
                                            type="number"
                                            style={{ width: 130 }}
                                            onChange={(e)=>{this.inputchange(e,"ZYJT")}}
                                            placeholder=""
                                            data-type="ZYJT"
                                            defaultValue={this.props.formdata.ZYJT}
                                            />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">
                                        <span className="sb">
                                            <i>总</i>
                                            <i>磷</i>
                                        </span>
                                        <InputNumber
                                            type="number"
                                            style={{ width: 130 }}
                                            onChange={(e)=>{this.inputchange(e,"ZL")}}
                                            placeholder=""
                                            defaultValue={this.props.formdata.ZL}
                                            data-type="ZL"
                                            />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">

                                        <span className="sb">
                                            <i>总</i>
                                            <i>锌</i>
                                        </span>
                                        <InputNumber
                                            type="number"
                                            style={{ width: 130 }}
                                            placeholder=""
                                            onChange={(e)=>{this.inputchange(e,"ZX")}}
                                            defaultValue={this.props.formdata.ZX}
                                            data-type="ZX"
                                            />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">

                                        <span className="sb">
                                            <i>总</i>
                                            <i>氰</i>
                                            <i>化</i>
                                            <i>物</i>
                                        </span>
                                        <InputNumber
                                            type="number"
                                            style={{ width: 130 }}
                                            onChange={(e)=>{this.inputchange(e,"ZQHW")}}
                                            defaultValue={this.props.formdata.ZQHW}
                                            placeholder=""
                                            data-type="ZQHW"
                                            />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">

                                        <span className="sb">
                                            <i>硫</i>
                                            <i>酸</i>
                                            <i>盐</i>
                                        </span>
                                        <InputNumber
                                            style={{ width: 130 }}
                                            onChange={(e)=>{this.inputchange(e,"ZLS")}}
                                            placeholder=""
                                            data-type="ZLS"
                                            defaultValue={this.props.formdata.ZLS}
                                            type="number"
                                            />
                                        <span>mg/L</span>
                                    </div>
                                    <div className="li">
                                        <span className="sb">
                                            <i>盐</i>
                                            <i>度</i>
                                        </span>
                                        <InputNumber
                                            style={{ width: 130 }}
                                            onChange={(e)=>{this.inputchange(e,"ZYD")}}
                                            placeholder=""
                                            data-type="ZYD"
                                            defaultValue={this.props.formdata.ZYD}
                                            type="number"
                                            />
                                        <span>mg/L</span>
                                    </div>
                                </div>
                                <div className="bz">
                                    <div className="tit">污染物排放标准</div>
                                    <div className="li"><span>40</span><span>mg/L</span></div>
                                    <div className="li"><span>1</span><span>mg/L</span></div>
                                    <div className="li"><span>3</span><span>mg/L</span></div>
                                    <div className="li"><span>0.5</span><span>mg/L</span></div>
                                    <div className="li"><span>--</span></div>
                                    <div className="li"><span>--</span></div>
                                </div>

                            </div>
                        </div>
                        <button onClick={this.subform} className="formbtn">确定</button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({mainform, data:{formdata}}) => {
    return {...mainform, formdata};
}
export default connect(mapStateToProps)(Page);
