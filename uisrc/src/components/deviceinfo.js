/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Bomlist from './bomlist';
import Show3d from './show3d';
import Setfrom from './setfrom';
import Navtitle from './navtitle';
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
                <Setfrom />
                <Show3d history={this.props.history} />
                <Bomlist />
            </div>
        );
    }
}
const mapStateToProps = ({}) => {
    return {};
}
export default connect()(Page);
