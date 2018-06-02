/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Bomlist from './bomlist';
import Show3d from './show3d';
import Setfrom from './setfrom';
import Navtitle from './navtitle';
import Logo from "../img/logo.png";
import Sanshitu from "../img/sanshitu.png"
import "./index.css";
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
        return (
            <div
                className="indexPage AppPage"
                style={{ height : `${this.state.innerHeight}px`,overflow:"hidden" }}
                >
                <div className="headcontent">
                    <div>
                        <img src={Logo} width="80"/>
                        <span className="title">模块化滤池（异养）处理系统V1.0 | 设备纵向展示</span>
                    </div>
                    <div className="backlnk" onClick={()=>{this.props.history.push("/");}}>返回</div>
                </div>
                <div className="showstylepage">
                    <div className="cont">
                        <div className="l">
                            <div className="l1">
                                <div className="tt">三视图</div>
                                <div className="cc"><img src={Sanshitu} /></div>
                            </div>
                        </div>
                        <div className="r s3d">
                            <div className="cc s3d">
                                <Show3d history={this.props.history} />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = ({}) => {
    return {};
}
export default connect()(Page);
