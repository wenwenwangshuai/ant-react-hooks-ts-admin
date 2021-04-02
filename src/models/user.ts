import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryCurrent } from '@/services/user';
import { IUserInfoObj } from '@/interface/user';

export interface CurrentUser extends IUserInfoObj {
  functionCodeList: string[]; // 当前角色功能列表code对应的列表，用于控制按钮显示
  functionUrlList: string[]; // 当前角色功能列表Url对应的列表，用于控制菜单的显示
  notifyCount: number;
  unreadCount: number;
}

export interface UserModelState {
  currentUser: Partial<CurrentUser>;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      try {
        const response: IUserInfoObj = yield call(queryCurrent);
        const list: string[] = ['home',...(response.authority || [])];
        yield put({
          type: 'saveCurrentUser',
          payload: {
            ...response,
            functionCodeList: [],
            functionUrlList: list, // 菜单对应集合
          },
        });
        if (payload.callBack) {
          payload.callBack(list);
        }
      } catch (error) {
        if (payload.errorBack) {
          payload.errorBack();
        }
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
