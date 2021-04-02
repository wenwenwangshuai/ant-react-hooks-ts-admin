import request from '@/utils/request';
import { ILoginResp } from '@/interface/user';

export interface LoginParamsType {
  userName: string;
  password: string;
}
// 账号登录
export async function fakeAccountLogin(params: LoginParamsType): Promise<ILoginResp> {
  return new Promise(resolve => {
    resolve({
      account: {
        roleId: 1,
        userName: 'admin'
      },
      token: 'xxxx'
    }) 
  })
}
