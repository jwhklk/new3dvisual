import { createReducer } from 'redux-act';
import {
    set_showmodel,
    set_device,
    set_formdata
} from '../actions';

const initial = {
    data:{
        showmodel:"500T-1",
        device: {
            "id" : "500T-1",
            "COD" : "1000~3000",
            "氨氮" : "30~100",
            "SS" : "100~500",
            "水处理量" : "500",
            "children" : [ "shuijieshenhuaguan", "SBR-chi", "zhongjianshuichi", "shengwulvchi" ]
        },
        formdata : {}
    },
};

const data = createReducer({
    [set_showmodel]: (state, payload) => {
        return { ...state, showmodel: payload};
    },
    [set_device]: (state, payload) => {
        return { ...state, device: payload};
    },
    [set_formdata]: (state, payload) => {
        return { ...state, formdata : payload};
    }
}, initial.data);

export default data;
