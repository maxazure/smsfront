import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryCompanies, addCompany, updateCompany, removeCompany, querycompany } from './service';
import { TableListItem } from './data.d';

export interface StateType {
    data: TableListItem[];
  }
export interface SingleType {
    single: TableListItem;
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
    namespace: 'company',

    state: {
        data:[]
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {
        const response = yield call(queryCompanies, payload);
        yield put({ type: 'save', payload: response });
      },
      *show({ payload, callback }, { call, put }) {
        const response = yield call(querycompany, payload);
        console.log(response)
        yield put({ type: 'single', payload: response });
          if (callback && typeof callback === 'function') {
            callback();
          }
        
        
      },
      *add({ payload, callback }, { call, put }) {
        yield call(addCompany, payload);
        yield put({type: 'fetch'});
      },
      *remove({ payload, callback }, { call, put }) {
        yield call(removeCompany, payload);
        yield put({type: 'fetch'});
      },
      *update({ payload, callback }, { call, put }) {
        yield call(updateCompany, payload);
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