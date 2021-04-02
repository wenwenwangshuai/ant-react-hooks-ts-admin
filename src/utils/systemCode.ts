import { EStatus } from '@/constants/list';

const SystemCode = {
  orderStatus: {
    [EStatus.On]: '开启',
    [EStatus.Off]: '结束',
  },
}

export default SystemCode ;
