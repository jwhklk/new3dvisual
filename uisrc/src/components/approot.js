/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { map_setmapinited, carmapshow_destorymap, ui_setmapstyle } from '../actions';
import { Route,Redirect,Switch} from 'react-router-dom';

import Index from './index.js';
import Deviceinfo from './deviceinfo';
import Showstyle1 from './showstyle1';
import Showstyle2 from './showstyle2';
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
                    <Route path="/showstyle/1" component={Showstyle1} />
                    <Route path="/showstyle/2" component={Showstyle2} />
                    <Route path="/main" component={Main} />
                    <Route path="/mainform" component={Mainform} />
                </Switch>    
            </div>
        );
    }
}
export default connect()(AppRoot);
