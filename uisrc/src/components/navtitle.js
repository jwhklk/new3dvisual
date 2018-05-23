/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Img from '../img/1.png';
import "./navtitle.css";



class Page extends React.Component {
    
    back=()=>{
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="navtitle">
                <a onClick={this.back}>首页</a>
                <span> &gt;</span>
                <span>{this.props.showmodel}</span>
            </div>
        );
    }
}
const mapStateToProps = ({data:{showmodel}}) => {
    return { showmodel };
}
export default connect(mapStateToProps)(Page);