import { select,put,call,take,takeEvery,takeLatest,cancel,fork,join,throttle } from 'redux-saga/effects';
import { create3dflow } from './mapmain';

export default function* rootSaga() {
    try{
        yield fork(create3dflow);
    }catch(e){

    }
}
