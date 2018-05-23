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
import Titimg from "../img/9.jpg";
import Btn from "../img/7.png";
import Config from "../env/config";

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
    runstart=()=>{
        this.props.history.push("/mainform");
    }
    render() {
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
                    <div className="mainwamp mmmain">
                        <img src={Titimg} className="titimg" />
                        <img src={Building} className="building" />
                        <div className="btncont"><button onClick={this.runstart}>开始运行</button></div>
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
