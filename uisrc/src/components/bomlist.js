/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Tree } from 'antd';
import 'antd/dist/antd.css';
import './bomlist.css';
import Device from '../data/device';
import _ from 'lodash';
import Showcad from './showcad';
import Titimg from "../img/11.jpg";
import Titimg2 from "../img/12.jpg";
import Listimg1 from "../img/14.jpg";
import Listimg2 from "../img/13.jpg";
import Devicedata from '../data/device';
import {set_showmodel} from '../actions';
const TreeNode = Tree.TreeNode;
let resizetimecontent = null;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            showmodel: this.props.showmodel
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

    // componentWillReceiveProps (nextProps) {
    //     if(nextProps.showmodel !== this.props.showmodel){
    //         this.setState({showmodel: nextProps.showmodel});
    //     }
    // }

    selshowmodel=(v)=>{
        // console.log(v);
        this.props.dispatch(set_showmodel(v));
    }
    render() {
        const domtype = this.props.showmodel.split("-")[0];
        const isfather = (domtype ==="500T")||(domtype ==="1000T")||(domtype === "3000T");
        const { device, showmodel, bomlist } = this.props;

        return (
            <div className="bomPage bomlistpage" style={{width: `${this.state.innerWidth*.33-40}px`}}>
                <div className="bomcontent">
                    <div>
                        <div className="title">
                            <img src={Titimg} />
                        </div>
                        { !!this.props.bomlist &&
                            <div className="bomlist">
                                { !isfather && 
                                    <div className="bomli bomlitit">
                                        <span>名称</span>
                                        <span>性能参数</span>
                                        <span>功率(Kw)</span>
                                        <span>数量</span>
                                        <span>备注</span>
                                    </div>
                                }
                                { !!isfather && 
                                    <div className="bomli bomli2 bomlitit">
                                        <span>名称</span>
                                        <span>尺寸(m)</span>
                                        <span>数量</span>
                                        <span>结构形式</span>
                                        <span>材质</span>
                                        <span>板厚(mm)</span>
                                    </div>
                                }
                                {
                                    _.map(this.props.bomlist, (v, i)=>{
                                        let bomlistyle = "bomli";
                                        if(!!isfather){
                                            bomlistyle = "bomli bomli2";
                                        }
                                        return (
                                            <div className={bomlistyle} key={i}>
                                                <span className="tt">{i}</span>
                                                {_.map(v, (v2, i2)=>{
                                                    return (
                                                        <span className="vv">{v2}</span>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        { 
                            !this.props.bomlist && 
                            <div className="nodata">
                                <span>- 暂无数据 -</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="childlist">
                    <div className="title">
                        <img src={Titimg2} />
                    </div>
                    <div className="listcon">
                        <div className="nav">
                            <div>总设备：</div>
                            <div>子装备：</div>
                        </div>
                        <div className="listlist">
                            <div className="li fli" onClick={this.selshowmodel.bind(this,device['id'])}>{device['id']}<img src={Listimg1} /></div>
                            { _.map(device.children, (d, i)=>{
                                return (<div className="li cli" key={i} onClick={this.selshowmodel.bind(this,d)}><span>{Devicedata.namedata[d]}</span><img src={Listimg2} /></div>)
                            }) }
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = ({data:{showmodel,device}}) => {
    let bomlist = null;
    if(!!showmodel && !!Device.bomdata[showmodel]){
        bomlist = Device.bomdata[showmodel];
    }
    return { bomlist, showmodel, device };
}
export default connect(mapStateToProps)(Page);