import React from 'react';
import { Row } from 'antd';
import styles from './index.less';

interface IProps {
  title?: string;
  isBorder?: boolean;
}

const FormLayout: React.FC<IProps> = ({ title = '', isBorder = false, children }) => (
  <div className={`${styles.formBlock} ${isBorder ? styles.borderBottom : ''}`}>
    <div className={styles.header}>{title}</div>
    <Row className={styles.formContainer}>{children}</Row>
  </div>
);

export default FormLayout;
