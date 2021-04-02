import { Reducer } from 'redux';
import { Effect, Subscription } from 'dva';
import { ISelectOptions } from '@/utils/form';
import { getAllRegionList } from '@/services/global';
import { ConnectState } from './connect.d';
import { IRegionObj } from '@/interface/common';

export interface GlobalModelState {
  collapsed: boolean;
  regionList: IRegionObj[]; // 省市列表
  previousPageUrl: string; // 上一个页面的url地址，为了配合router的replace关闭顶部tab使用
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    getModelRegionList: Effect;
    getPreviousPageUrl: Effect;
    setPreviousPageUrl: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    setRegionList: Reducer<GlobalModelState>;
    editPreviousPageUrl: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const defaultStatus = {
  collapsed: false,
  regionList: [], // 地区列表
  previousPageUrl: '', // 上一个页面的url地址，为了配合router的replace关闭顶部tab使用
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: defaultStatus,

  effects: {
    // 获取所有城市列表
    *getModelRegionList({ callback }, { put, call, select }) {
      const regionList: IRegionObj[] = yield select((state: ConnectState) => state.global.regionList);
      if (regionList.length === 0) {
        const data = yield call(getAllRegionList);
        yield put({
          type: 'setRegionList',
          payload: data.list || [],
        });
        callback(data.list || []);
      } else {
        callback(regionList);
      }
    },
    *getPreviousPageUrl({ callback }, { select }) {
      const previousPageUrl: ISelectOptions[] = yield select(
        (state: ConnectState) => state.global.previousPageUrl,
      );
      callback(previousPageUrl);
    },
    *setPreviousPageUrl({ payload }, { put }) {
      yield put({
        type: 'editPreviousPageUrl',
        payload,
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(state = defaultStatus, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    setRegionList(state = defaultStatus, { payload }): GlobalModelState {
      return {
        ...state,
        regionList: payload,
      };
    },
    editPreviousPageUrl(state = defaultStatus, { payload }): GlobalModelState {
      return {
        ...state,
        previousPageUrl: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
