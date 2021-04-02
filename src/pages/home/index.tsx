import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, Card } from 'antd';
import { getHomeAccount, getWeekSale } from '@/services/home';
import { IHomeAccountResp, IHomeWeekSaleResp } from '@/interface/home';
import ReactEcharts from 'echarts-for-react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const [accountData, setAccountData] = useState<IHomeAccountResp>();
  const [weekSaleData, setWeekSaleData] = useState<IHomeWeekSaleResp>();

  const onloadData = () => {
    getHomeAccount().then(accountRes => {
      setAccountData(accountRes)
    }).catch(() => { })
    getWeekSale().then(weekSaleRes => {
      setWeekSaleData(weekSaleRes)
    }).catch(() => { })
  }

  useEffect(() => {
    onloadData()
  }, [])

  const getAccountOption = (data: IHomeAccountResp) => {
    return {
      title: {
        text: '用户分析',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'pie',
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [{ value: data.noAuth, name: '未授权用户' }, { value: data.member, name: '会员用户' }, { value: data.ordinary, name: '普通用户' }, { value: data.total, name: '全部用户' }]
        }
      ]
    }
  }

  const getWeekSaleOption = (data: IHomeWeekSaleResp) => {
    return {
      title: {
        text: '周销售',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['活动', '充值', '会员', '提现']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        data: [data.coupon, data.charge, data.member, data.task],
        type: 'bar',
      }]
    }
  }

  return (
    <PageHeaderWrapper>
      <div>
        <Row gutter={16}>
          {accountData && <Col span={12} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Card>
              <ReactEcharts option={getAccountOption(accountData)} theme="Imooc" style={{ height: '400px', width: '100%' }} />
            </Card>
          </Col>}
          {weekSaleData && <Col span={12} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Card>
              <ReactEcharts option={getWeekSaleOption(weekSaleData)} theme="Imooc" style={{ height: '400px', width: '100%' }} />
            </Card>
          </Col>}
        </Row>
      </div>
    </PageHeaderWrapper>
  )
};
export default HomePage;
