import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  PageLoading,
} from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { router, Redirect } from 'umi';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState, Route } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import Exception403 from '@/pages/exception/403';
import PageTabs from '@/components/PageTabs';
import { USER_TOKEN } from '@/constants/user';
import { getAuthorityFromRouter } from '@/utils/utils';
import { createFromIconfontCN } from '@ant-design/icons';
import styles from './BasicLayout.less';
import logo from '../assets/logo-white.png';
import 'braft-editor/dist/index.css';
import { menuIconUrl } from '@/utils/config';

const IconFont = createFromIconfontCN({
  scriptUrl: menuIconUrl,
});

export interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
  currentUser: Partial<CurrentUser>;
  originalMenuData: Route[];
}
/**
 * use Authorized check all menu item
 */

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, location, settings, currentUser, originalMenuData } = props;
  const isLogin: boolean = !!localStorage.getItem(USER_TOKEN); // 是否登录
  const [isReady, setIsReady] = useState<boolean>(false); // 是否完成初始化数据
  const [allRouteList, setAllRouteList] = useState<Route[]>([]); // 所有路由列表

  // 获取所有路由
  const ForRouterFn = (routes: Route[] = [], functionUrlList: string[]) => {
    let routeList: Route[] = [];
    routes
      .filter(item => !item.meta || (functionUrlList || []).includes(item.meta?.name))
      .forEach(item => {
        const list = item.routes
          ? [{ ...item, routes: undefined }, ...ForRouterFn(item.routes, functionUrlList)]
          : [item];

        routeList = [...routeList, ...list];
      });
    routes
      .forEach(item => {
        const list = item.routes
          ? [{ ...item, routes: undefined }, ...ForRouterFn(item.routes, functionUrlList)]
          : [item];

        routeList = [...routeList, ...list];
      });
    return routeList;
  };

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
        errorBack: () => {
          dispatch({
            type: 'login/logout',
          });
        },
        callBack: (functionUrlList: string[]) => {
          const routerList = ForRouterFn(props.route?.routes, functionUrlList);
          dispatch({
            type: 'menu/getMenuData',
            payload: {
              routes: routerList,
              callBack: () => {
                setAllRouteList(routerList);
                setIsReady(true);
              },
            },
          });
        },
      },
    });
  }, []);

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList
      .filter(item => item.meta && (currentUser.functionUrlList || []).includes(item.meta.name))
      .map(item => {
        const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
        return Authorized.check(item.authority, localItem, null) as MenuDataItem;
      });

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const menuItemRender = (menuItemProps: MenuDataItem) => {
    if (menuItemProps.children && menuItemProps.children.length > 0) {
      return (
        <div>
          <IconFont type={menuItemProps.icon} />
          <span>{menuItemProps.name}</span>
        </div>
      );
    }
    return (
      <Link to={menuItemProps.path as string}>
        <IconFont type={menuItemProps.icon} />
        <span>{menuItemProps.name}</span>
      </Link>
    );
  };

  // 没有token或没有角色ID
  if (!isLogin) {
    return <Redirect to="/user/login" />;
  }
  if (!isLogin || !isReady) {
    return <PageLoading />;
  }
  // 路由权限判断
  if (!getAuthorityFromRouter(allRouteList, location?.pathname || '')) {
    return <Exception403 />;
  }
  return (
    <div style={{ height: '100%' }}>
      <ProLayout
        siderWidth={230}
        logo={logo}
        menuHeaderRender={(logoDom, titleDom) => (
          <span
            style={{ marginTop: '16px', display: 'block' }}
            onClick={() => {
              router.push('/');
            }}
          >
            {logoDom}
            {titleDom}
          </span>
        )}
        onCollapse={handleMenuCollapse}
        menuItemRender={menuItemRender}
        subMenuItemRender={menuItemRender}
        breadcrumbRender={(routers = []) => routers}
        itemRender={(route: Route) =>
          route.component ? (
            <Link to={route.path || ''}>{route.breadcrumbName}</Link>
          ) : (
              <span>{route.breadcrumbName}</span>
            )
        }
        // footerRender={footerRender}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        className={styles.mainProLayout}
        fixedHeader
        {...props}
        {...settings}
      >
        <ConfigProvider locale={zhCN}>
          <PageTabs originalMenuData={originalMenuData}>{children}</PageTabs>
        </ConfigProvider>
      </ProLayout>
    </div>
  );
};

export default connect(({ global, settings, user, menu: menuModel }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: user.currentUser,
  menuData: menuModel.menuData,
  originalMenuData: menuModel.originalMenuData,
}))(BasicLayout);
