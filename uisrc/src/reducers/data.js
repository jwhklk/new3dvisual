import { createReducer } from 'redux-act';
import {
    set_showmodel,
    set_device,
    set_formdata,
    set_curbom
} from '../actions';

const initial = {
    data:{
        showmodel:"yiyang50000-100000",
        curbom:"yiyang01",
        device: {
            "J_TN" : "",
            "J_TP" : "",
            "J_SS" : "",
            "C_TN" : "",
            "C_TP" : "",
            "C_SS" : "",
            "SL": ""
        },
        formdata : null,
    },
};

const data = createReducer({
    [set_showmodel]: (state, payload) => {
        return { ...state, showmodel: payload};
    },
    [set_curbom]: (state, payload) => {
        return { ...state, curbom: payload};
    },
    [set_device]: (state, payload) => {
        return { ...state, device: payload};
    },
    [set_formdata]: (state, payload) => {
        return { ...state, formdata : payload};
    }
}, initial.data);

export default data;
