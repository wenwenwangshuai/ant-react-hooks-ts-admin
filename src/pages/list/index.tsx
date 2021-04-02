import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ColumnProps } from 'antd/lib/table';
import { Button, Divider } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { IMerchantObj, IMerchantListReq } from '@/interface/list';
import { limit } from '@/constants';
import StandardTable from '@/components/StandardTable';
import zdsTips from '@/utils/tips';
import SearchForm from './SearchForm';
import { columnsConfig } from './tableConfig';
import styles from './index.less';
import { getMerchantList } from '@/services/list';

const Index: React.FC = (props: any) => {
  const [list, setList] = useState<IMerchantObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 加载状态
  const [total, setTotal] = useState<number>(0); // 总数量
  const [current, setCurrent] = useState(1); // 当前所在页码偏移量
  const [pageSize, setPageSize] = useState(limit); // 记录数
  const [searchParam, setSearchParam] = useState<IMerchantListReq>(); // 搜索条件

  const getList = () => {
    if (!searchParam) {
      return;
    }
    const param = { ...(searchParam || {}), offset: (current - 1) *pageSize,limit: pageSize };
    setLoading(true);
    getMerchantList(param).then(res => {
      setList(res.list || []);
      setTotal(res.count);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  const paginationChange = (pagination: TablePaginationConfig) => {
    setCurrent(pagination.current || 1);
  };

  useEffect(() => {
    getList();
  }, [searchParam, current, pageSize, props.location]);

  const getSearchData = (info: IMerchantListReq) => {
    setCurrent(1);
    setSearchParam(info);
  };

  const btnClick = (info: IMerchantObj, type: string) => {
    switch (type) {
      case 'edit':
        
        break;
      case 'delete':
        zdsTips.confirm('确认删除此商户？', () => {})
        break;
      default:
        break;
    }
  };

  const columns: ColumnProps<IMerchantObj>[] = [
    {
      title: '序号',
      width: 60,
      dataIndex: 'rank',
      fixed: 'left',
      render: (text: string, record: IMerchantObj, index: number) => (current - 1) * pageSize + index + 1,
    },
    ...columnsConfig,
    {
      title: '操作',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (item: IMerchantObj) => (
        <div>
          <a
            onClick={(e: any) => {
              e.stopPropagation();
              btnClick(item, 'edit');
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={(e: any) => {
              e.stopPropagation();
              btnClick(item, 'delete');
            }}
          >
            删除
          </a>
        </div>
      ),
    },
  ];

  const addProdRender = () => (
    <Button type="primary">+ 新建商家</Button>
  );

  return (
    <PageHeaderWrapper className={styles.productManage}>
      <SearchForm
        submit={getSearchData}
        location={props.location}
        footerRender={addProdRender}
      />
      <StandardTable
        scroll={{ x: 'max-content' }}
        columns={columns}
        loading={loading}
        rowKey={(record: IMerchantObj) => String(record.id)}
        data={{
          list,
          pagination: {
            total, current, pageSize,
            showSizeChanger: true,
            onShowSizeChange: (currentNum, size) => {
              setPageSize(size);
              setCurrent(currentNum);
            }
          },
        }}
        onChange={paginationChange}
      />
    </PageHeaderWrapper>
  );
};
export default Index;
