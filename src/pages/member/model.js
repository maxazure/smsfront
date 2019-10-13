import { queryMembers, addMember, updateMember, removeMember, querymember } from './service';

const Model = {
  namespace: 'member',

  state: {
    data: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryMembers, payload);

      yield put({ type: 'save', payload: response });
    },
    * show({ payload, callback }, { call, put }) {
      const response = yield call(querymember, payload);

      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * add({ payload }, { call, put }) {
      yield call(addMember, payload);
      yield put({ type: 'fetch' });
    },
    * remove({ payload, callback }, { call }) {
      yield call(removeMember, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * update({ payload, callback }, { call }) {
      yield call(updateMember, payload);
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