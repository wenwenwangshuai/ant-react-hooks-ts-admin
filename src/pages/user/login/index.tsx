import React, { Component } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { Button } from 'antd';
import { router } from 'umi';
import styles from './index.less';
import LoginComponents from './components/Login';

const { UserName, Password, Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  submitting?: boolean;
}

interface LoginState {
  type: string;
  userRoleId?: number;
}

class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    userRoleId: undefined,
  };

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    if (!err) {
      const { type } = this.state;
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type
        },
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({
      type,
    });
  };

  // 选择角色切换
  roleHandleChange = (value: number) => {
    this.setState({
      userRoleId: value,
    });
  };

  // 进入系统
  enterSystem = () => {
    if (!this.state.userRoleId) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'login/goSystem',
      payload: {
        roleId: this.state.userRoleId,
      },
    });
  };

  getContent = () => {
    const { submitting } = this.props;
    const { type } = this.state;

    return (
      <LoginComponents
        defaultActiveKey={type}
        onTabChange={this.onTabChange}
        onSubmit={this.handleSubmit}
        onCreate={(form?: FormComponentProps['form']) => {
          this.loginForm = form;
        }}
      >
        <UserName
          name="userName"
          placeholder="用户名（任意输入）"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="密码（任意输入）"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
          onPressEnter={e => {
            e.preventDefault();

            if (this.loginForm) {
              this.loginForm.validateFields(this.handleSubmit);
            }
          }}
        />
        <div style={{textAlign: 'right', marginBottom: 7}}>
          <Button size='small' type='link' onClick={() => {
            router.push(`/retrieve_pwd`);
          }}>忘记密码？</Button>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginComponents>
    );
  };

  render() {
    return <div className={styles.loginFormMain}>{this.getContent()}</div>;
  }
}

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['login/login'],
}))(Login);
