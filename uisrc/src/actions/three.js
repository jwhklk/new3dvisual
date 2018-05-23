// export * from './*';
import { createAction } from 'redux-act';

export const create3dmodel = createAction('create3dmodel');

export const set_showmodel = createAction('set_showmodel');
export const set_device = createAction('set_device');

export const set_selectmainform = createAction('set_selectmainform');
export const set_formdata = createAction('set_formdata');
