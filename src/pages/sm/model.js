import { querySms, addSm, updateSm, removeSm, querysm, addSms } from './service';

const Model = {
  namespace: 'sm',

  state: {
    data: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(querySms, payload);

      yield put({ type: 'save', payload: response });
    },
    * show({ payload, callback }, { call, put }) {
      const response = yield call(querysm, payload);

      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * batchadd({ payload }, { call, put }) {
      yield call(addSms, payload);
    },
    * add({ payload }, { call, put }) {
      yield call(addSm, payload);
      yield put({ type: 'fetch' });
    },
    * remove({ payload, callback }, { call }) {
      yield call(removeSm, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * update({ payload, callback }, { call }) {
      yield call(updateSm, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    single(state, action) {
      return {
        ...state,
        single: action.payload,
      };
    },
  },
};

export default Model;