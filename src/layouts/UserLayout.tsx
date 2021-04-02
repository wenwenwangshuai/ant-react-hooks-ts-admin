import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import React from 'react';
import { connect } from 'dva';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { ConnectProps, ConnectState } from '@/models/connect';
import loginLeftImg from '../assets/loginLeft.png';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <ConfigProvider locale={zhCN}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.loginMain}>
        <div className={styles.loginContent}>
          <div className={styles.loginLeft}>
            <img src={loginLeftImg} alt="img" />
          </div>
          <div className={styles.loginRight}>
            <div className={styles.loginRightHeader}>
              <div className={styles.loginRightH1}>前端小江湖 </div>
              <div className={styles.loginRightH2}>后台管理系统</div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
