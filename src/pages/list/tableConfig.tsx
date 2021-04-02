import { ColumnProps } from 'antd/lib/table';
import { conversionDateTime } from '@/utils/conversion';
import { IMerchantObj } from '@/interface/list';
import { statusOpt } from '@/constants/list';
import React from 'react';

export const columnsConfig: ColumnProps<IMerchantObj>[] = [
  {
    title: 'ID',
    width: 75,
    dataIndex: 'id',
    fixed: 'left',
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (text: string, record: IMerchantObj) => {
      const info = statusOpt.find(item => record.status === item.value)
      return <span style={{ color: info?.color }}>{info?.label}</span>
    },
  },
  {
    title: '所在城市',
    dataIndex: 'region_name',
    width: 100
  },
  {
    title: '创建时间',
    key: 'create_dt',
    width: 150,
    render: (text: string, record: IMerchantObj) => conversionDateTime(record.create_dt) || '--',
  },
];
