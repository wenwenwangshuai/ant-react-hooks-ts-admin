import request from '@/utils/request';
import { IUserInfoObj } from '@/interface/user';

export function queryCurrent(): Promise<IUserInfoObj> {
  return new Promise(resolve => {
    resolve({
      id: 1,
      roleId: 1,
      userName: 'admin',
      authority: ['form','list']
    });
  });
}
// 发送邮箱验证码
export function sendEmail(params: { email: string }): Promise<any> {
  return request('/sys.User/SendEmail', {
    method: 'POST',
    data: params,
  });
}

// 校验邮箱验证码
export function checkCaptcha(params: { email: string; code: string }): Promise<any> {
  return request('/sys.User/CheckCaptcha', {
    method: 'POST',
    data: params,
  });
}

// 重置密码
export function modifyPwdByEmail(params: {
  email: string;
  pwd: string;
  code: string;
}): Promise<any> {
  return request('/sys.User/EmailModifyPwd', {
    method: 'POST',
    data: params,
  });
}

// 修改密码
export function userModifyPwd(params: { email: string; pwd: string; code: string }): Promise<any> {
  return request('/sys.User/UserModifyPwd', {
    method: 'POST',
    data: params,
  });
}
