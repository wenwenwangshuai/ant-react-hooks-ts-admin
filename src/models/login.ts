import { Reducer } from 'redux';
import { Effect } from 'dva';
import router from 'umi/router';
import { USER_TOKEN } from '@/constants/user';
import { fakeAccountLogin } from '@/services/login';
import { ILoginResp } from '@/interface/user';
import { setAuthority } from '@/utils/authority';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    goSystem: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response: ILoginResp = yield call(fakeAccountLogin, payload);
        localStorage.setItem(USER_TOKEN, `Bearer ${response.token}`);
        yield put({
          type: 'goSystem'
        });
      } catch (err) {
        console.log(err);
      }
    },

    // 进入系统
    *goSystem({ payload }, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority: 'admin',
          status: 'ok',
          type: 'account',
        },
      });
      router.replace('/');
    },

    logout() {
      localStorage.clear();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login') {
        router.replace('/user/login');
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
