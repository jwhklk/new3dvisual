/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { map_setmapinited, carmapshow_destorymap, ui_setmapstyle } from '../actions';
import { Route,Redirect,Switch} from 'react-router-dom';

import Index from './index.js';
import Deviceinfo from './deviceinfo';
import Main from './main';
import Mainform from './mainform';

class AppRoot extends React.Component {
    componentWillMount() {}
    componentWillUnmount() {}
    render() {
        return (
            <div className="AppContainer">
                <Switch>
                    <Route exact path="/" component={()=>(<Redirect to="/main"/>)} />
                    
                    <Route path="/deviceinfo" component={Deviceinfo} />
                    <Route path="/main" component={Main} />
                    <Route path="/mainform" component={Mainform} />
                </Switch>    
            </div>
        );
    }
}
export default connect()(AppRoot);
