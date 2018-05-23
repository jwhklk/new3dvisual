/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './show3d.css';
import {loadurl} from '../util';
import View3d from './view3d';
import Backimg from "../img/15.jpg";
import Devicedata from '../data/device';

class Page extends React.Component {

    render() {
        let titlename = Devicedata.namedata[this.props.showmodel] || this.props.showmodel;
        console.log(titlename);
        return (
            <div className="show3dPage">
                <div className="title">
                    {titlename}
                    <img src={Backimg} onClick={this.props.history.goBack} />
                </div>
                <View3d />
            </div>
        );
    }
}

const mapStateToProps = ({data:{showmodel}}) => {
    return { showmodel };
}
export default connect(mapStateToProps)(Page);
