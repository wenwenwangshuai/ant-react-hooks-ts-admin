import { IMerchantListReq, IMerchantObj } from '@/interface/list';
import { EStatus } from '@/constants/list';

// 获取商家列表
export function getMerchantList(
  params: IMerchantListReq,
): Promise<{ count: number; list: IMerchantObj[] }> {
  return new Promise(resolve => {
    resolve({
      count: 1,
      list: [
        {
          id: 1,
          name: '商家名称',
          logo: 'xxxx',
          status: EStatus.On,
          region_name: '北京市',
          create_dt: 1617002118,
        },
      ],
    });
  });
}
