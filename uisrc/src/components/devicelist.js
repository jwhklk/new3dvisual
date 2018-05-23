/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Img from '../img/1.png';
import "./devicelist.css";
import { Pagination } from 'antd';
import Navtitle from './navtitle';


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toinfo=(id)=>{
        console.log(id);
        this.props.history.push("/deviceinfo/0")
    }
    render() {
        return (
            <div className="devicelistPage">
                <Navtitle />
                <div className="content">
                    <ul>
                        <li onClick={this.toinfo.bind(this, "设备id")}><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                        <li><div><p><img src={Img} /></p><p>气源处理元件</p></div></li>
                    </ul>
                </div>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        );
    }
}
export default Page;