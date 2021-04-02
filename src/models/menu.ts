import { Route } from '@/models/connect';
import { Effect } from 'dva';
import { Reducer } from 'redux';
/**
 * filter menuData
 */
const filterMenuData = (menuData: Route[]) => {
  if (!menuData) {
    return [];
  }
  return menuData.filter(item => item.name && !item.hideInMenu);
};

export interface MenuModelState {
  originalMenuData: Route[];
  menuData: Route[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    getMenuData: Effect;
  };
  reducers: {
    save: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    originalMenuData: [],
    menuData: [],
  },
  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes } = payload;
      const menuData = filterMenuData(routes);
      yield put({
        type: 'save',
        payload: { originalMenuData: routes, menuData },
      });
      payload.callBack();
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default MenuModel;
