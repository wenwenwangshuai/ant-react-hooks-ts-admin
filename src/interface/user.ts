export interface ILoginResp {
  account: {
    roleId: number;
    userName: string;
  }; // 人员角色列表
  token: string; // 用户秘钥
}

export interface IUserInfoObj {
  id: number; // 用户id
  roleId: number; // 角色id
  userName: string; // 用户名
  authority: string[]; // 可访问的菜单
}
