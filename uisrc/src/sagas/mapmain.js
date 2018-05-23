import { create3dmodel } from '../actions';
import { select,put,call,take,takeEvery,takeLatest,cancel,fork,join,throttle } from 'redux-saga/effects';
import { delay } from 'redux-saga';


export function* create3dflow(){

    //创建地图
    yield takeEvery(`${create3dmodel}`, function*() {

    })
}
