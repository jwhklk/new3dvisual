/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Devicelist from "./devicelist.js";
import Devicetree from "./devicetree.js";
import "./index.css";
let resizetimecontent = null;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerHeight: window.innerHeight
        };
    }
    // componentWillMount(){
    //
    // }
    componentDidMount() {
      // let threeiframe = document.getElementById("threeiframe");
      // console.log(threeiframe);
      // threeiframe.style.display="none";

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
                style={{
                    height : `${this.state.innerHeight}px`,
                    background : "#EEE"
                }}
                >
                <Devicetree />
                <Devicelist history={this.props.history} />
            </div>
        );
    }
}
const mapStateToProps = ({}) => {
    return {};
}
export default connect()(Page);
