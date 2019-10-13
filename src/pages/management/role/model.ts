
import { queryRoles, addRole, updateRole, queryRole, removeRole } from './service';
import { RoleItem } from './data.d';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
export interface StateType {
    data: RoleItem[];
  }
export interface SingleType {
    single: RoleItem;
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
      show: Effect;
    };
    reducers: {
      save: Reducer<StateType>;
      single: Reducer<SingleType>;
    };
  }

const Model: ModelType = {
    namespace: 'role',

    state: {
        data:[]
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {
        const response = yield call(queryRoles, payload);
        yield put({ type: 'save', payload: response });
      },
      *show({ payload, callback }, { call, put }) {
        const response = yield call(queryRole, payload);
        console.log(response)
        yield put({ type: 'single', payload: response });
          if (callback && typeof callback === 'function') {
            callback();
          }
      },
      *add({ payload, callback }, { call, put }) {
        yield call(addRole, payload);
        yield put({type: 'fetch'});
      },
      *remove({ payload, callback }, { call, put }) {
        yield call(removeRole, payload);
        yield put({type: 'fetch'});
      },
      *update({ payload, callback }, { call, put }) {
        yield call(updateRole, payload);
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
      single(state, action) {
        return {
          ...state,
          single: action.payload,
        };
      },
    },
  };
  
  export default Model;