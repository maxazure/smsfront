import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addUser, queryUser, removeUser, updateUser } from './service';

import { TableListData } from './data.d';

export interface StateType {
  data: TableListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listTableList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      yield call(addUser, payload);

      yield put({type: 'fetch'});
      //const response = yield call(addUser, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
     // if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      yield call(removeUser, payload);
     
    //const response = yield call(removeUser, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      //if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      yield call(updateUser, payload);
      yield put({type: 'fetch'});
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default Model;
