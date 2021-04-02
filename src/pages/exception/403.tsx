import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，您无权访问此页面"
    extra={
      <Button type="primary" onClick={() => router.push('/user/login')}>
        登录其他账号
      </Button>
    }
  />
);

export default NoFoundPage;
