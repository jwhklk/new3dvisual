import { createReducer } from 'redux-act';
import {
    set_selectmainform
} from '../actions';
import Device from '../data/device';
import _ from 'lodash';

const get_options = ({parentkey,parentvalue,targetkey})=>{
  let result = [];
  const devicelist = Device.devicelist;
  _.map(devicelist,(v)=>{
    if( v[parentkey] === parentvalue ){
      result.push(v[targetkey]);
    };
  });
  return result;
}


const initial = {
    data:{
        options_cod: [],
        options_ad: [],
        options_ss:[],
        selected_sl:'500',
        selected_cod: "1000~3000",
        selected_ad: "30~100",
        selected_ss: "100~500"
    },
};

const data = createReducer({
    [set_selectmainform]: (state, payload) => {
        const {key,value} = payload;

        let selected_sl = state.selected_sl;
        let selected_cod = state.selected_cod;
        let selected_ad  = state.selected_ad;
        let selected_ss  = state.selected_ss;

        if(key === 'SL'){
          selected_sl = value;
        }
        if(key === 'COD'){
          selected_cod = value;
        }
        if(key === 'AD'){
          selected_ad = value;
        }
        if(key === 'SS'){
          selected_ss = value;
        }

        let options_cod = get_options({
          parentkey:'水处理量',
          parentvalue:selected_sl,
          targetkey:'COD'
        });
        options_cod = _.uniq(options_cod);

        if(!_.find(options_cod,(o)=>{return o === selected_cod;})){
          if(options_cod.length > 0){
            selected_cod = options_cod[0];
          }
        }

        let options_ad = get_options({
          parentkey:'COD',
          parentvalue:selected_cod,
          targetkey:'氨氮'
        });
        options_ad = _.uniq(options_ad);
        if(!_.find(options_ad,(o)=>{ return o === selected_ad;})){
          if(options_ad.length > 0){
            selected_ad = options_ad[0];
          }
        }


        let options_ss =  get_options({
          parentkey:'氨氮',
          parentvalue:selected_ad,
          targetkey:'SS'
        });
        options_ss = _.uniq(options_ss);
        if(!_.find(options_ss,(o)=>{ return o === selected_ss;})){
          if(options_ss.length > 0){
            selected_ss = options_ss[0];
          }
        }

        console.log(`options_cod:${JSON.stringify(options_cod)},options_ad:${JSON.stringify(options_ad)},options_ss:${JSON.stringify(options_ss)}`);
        console.log(`selected_cod:${JSON.stringify(selected_cod)},selected_ad:${JSON.stringify(selected_ad)},selected_ss:${JSON.stringify(selected_ss)}`);


        return { ...state,options_cod,options_ad,options_ss,selected_sl,selected_cod,selected_ad,selected_ss};
    },
}, initial.data);

export default data;
