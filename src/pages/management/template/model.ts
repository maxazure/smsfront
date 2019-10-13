
import { queryTemplates, addTemplate, updateTemplate, queryTemplate, removeTemplate, queryTemplatebycompany, updateTemplatebycompany } from './service';
import { TemplateItem } from './data.d';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
export interface StateType {
  data: TemplateItem[];
}
export interface SingleType {
  single: TemplateItem;
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
    showbycompany: Effect;
    updatebycompany: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    single: Reducer<SingleType>;
  };
}

const Model: ModelType = {
  namespace: 'template',

  state: {
    data: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTemplates, payload);
      yield put({ type: 'save', payload: response });
    },
    *show({ payload, callback }, { call, put }) {
      const response = yield call(queryTemplate, payload);
      console.log(response)
      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    *showbycompany({ payload, callback }, { call, put }) {
      const response = yield call(queryTemplatebycompany, payload);
      console.log(response)
      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    *add({ payload, callback }, { call, put }) {
      yield call(addTemplate, payload);
      yield put({ type: 'fetch' });
    },
    *remove({ payload, callback }, { call, put }) {
      yield call(removeTemplate, payload);
      yield put({ type: 'fetch' });
    },
    *update({ payload, callback }, { call, put }) {
      yield call(updateTemplate, payload);
      yield put({ type: 'fetch' });
    },
    *updatebycompany({ payload, callback }, { call, put }) {
      yield call(updateTemplatebycompany, payload);
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
