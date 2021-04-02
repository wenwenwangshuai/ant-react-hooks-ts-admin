// import request from '@/utils/request';
import { IHomeAccountResp, IHomeWeekSaleResp } from '@/interface/home';

// 获取首页统计1
export function getHomeAccount(): Promise<IHomeAccountResp> {
  return new Promise(resolve => {
    resolve({
      innerMember: 11,
      member: 11,
      noAuth: 11,
      ordinary: 11,
      total: 11,
    });
  });
}

// 获取首页统计1
export function getWeekSale(): Promise<IHomeWeekSaleResp> {
  return new Promise(resolve => {
    resolve({
      charge: 11,
      coupon: 11,
      enjoy: 11,
      member: 11,
      task: 11,
    });
  });
}
