import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import logo from '@/assets/logo.png'
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends ConnectProps {
  currentUser: Partial<CurrentUser>;
  menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props: GlobalHeaderRightProps) => {

  const onMenuClick = (event: ClickParam) => {
    const { key } = event;
    const { dispatch } = props;
    switch (key) {
      case 'logout': // 退出登录
        if (dispatch) {
          dispatch({
            type: 'login/logout',
          });
        }
        break;
      default:
        break;
    }
    // router.push(`/account/${key}`);
  };

  const {
    currentUser = {
      userName: ''
    },
  } = props;

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return currentUser && currentUser.userName ? (
    <div>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={logo} alt="avatar" />
          <span className={styles.name}>{currentUser.userName}</span>
        </span>
      </HeaderDropdown>
    </div>
  ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
};
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
