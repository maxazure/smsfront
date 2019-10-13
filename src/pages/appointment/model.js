import { queryAppointments, addAppointment, updateAppointment, removeAppointment, queryappointment } from './service';

const Model = {
  namespace: 'appointment',

  state: {
    data: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryAppointments, payload);

      yield put({ type: 'save', payload: response });
    },
    * show({ payload, callback }, { call, put }) {
      const response = yield call(queryappointment, payload);
      console.log(response)
      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * add({ payload }, { call, put }) {
      yield call(addAppointment, payload);
      yield put({ type: 'fetch' });
    },
    * remove({ payload, callback }, { call }) {
      yield call(removeAppointment, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * update({ payload, callback }, { call }) {
      yield call(updateAppointment, payload);
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