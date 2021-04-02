import { IRegionObj } from '@/interface/common';

// 获取省市区列表
export function getAllRegionList(): Promise<{
  list: IRegionObj[];
}> {
  return new Promise((resolve) => {
    resolve({list: [
      {
        value: 1,
        label: '北京市',
        children: [
          {
            value: 2,
            label: '朝阳区',
          },
        ],
      },
      {
        value: 3,
        label: '上海市',
        children: [
          {
            value: 4,
            label: '浦东新区',
          },
        ],
      },
    ]})
  })
}