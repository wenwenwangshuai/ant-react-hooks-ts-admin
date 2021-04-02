import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';

const CustomPageHeaderWrapper: React.FC = props => (
  <PageHeaderWrapper className={styles.customPageHeaderWrapper}>{props.children}</PageHeaderWrapper>
);

export default CustomPageHeaderWrapper;
