import { querySetting, updateSetting } from './service';

const Model = {
  namespace: 'setting',
  state: {
    single: {},
  },

  effects: {
    * fetch({ payload, callback }, { call, put }) {
      const response = yield call(querySetting, payload);
      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * update({ payload, callback }, { call }) {
      yield call(updateSetting, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },

  reducers: {
    single(state, action) {
      return {
        ...state,
        single: action.payload,
      };
    },
  },
};

export default Model;