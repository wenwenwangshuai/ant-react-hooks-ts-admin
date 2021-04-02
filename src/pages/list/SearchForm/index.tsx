import React, { BaseSyntheticEvent, ReactNode, useEffect, useState } from 'react';
import { Form } from '@ant-design/compatible';
import { Row, Button } from 'antd';
import { getFormFields } from '@/utils/form';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { useDispatch } from 'dva';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { fieldsConfig, IFormProps } from './fieldsConfig';
import styles from './index.less';
import { IRegionObj } from '@/interface/common';
import { IMerchantListReq } from '@/interface/list';
import { getQueryRangeDate } from '@/utils';

interface IProps extends FormComponentProps {
  submit: (param: IMerchantListReq) => void;
  location: any,
  footerRender?: () => ReactNode;
}

const BaseSearch: React.FC<IProps> = (props: IProps) => {
  const [putAway, setPutAway] = useState(true); // 是否收起
  const [cityList, setCityList] = useState<IRegionObj[]>([]); // 省市区列表
  const dispatch = useDispatch();

  const handlerSubmit = () => {
    props.form.validateFields((err, values: IFormProps) => {
      if (!err) {
        let timeList: number[] = [];
        if (values.createTm && values.createTm.length) {
          timeList = getQueryRangeDate(values.createTm);
        }
        props.submit({
          ...values,
          createTm: timeList
        });
      }
    });
  };

  const handleReset = () => {
    props.form.resetFields();
  };

  useEffect(() => {
    handlerSubmit();
    dispatch({
      type: 'global/getModelRegionList',
      callback: (list: IRegionObj[]) => {
        setCityList(list);
      },
    });
  }, []);

  const { getFieldDecorator } = props.form;
  const newFieldsConfig = fieldsConfig({cityList})
  return (
    <div className={styles.searchForm}>
      <Form
        onSubmit={(e: BaseSyntheticEvent) => {
          e.preventDefault();
          handlerSubmit();
        }}
      >
        <Row className={styles.formContainer}>
          {getFormFields(getFieldDecorator, newFieldsConfig, putAway, 7)}
        </Row>
      </Form>
      <div className={`searchBtnList topRow${newFieldsConfig.length} putAway${putAway}`}>
        <div className="searchBtnMain">
          <Button key="back" onClick={handleReset}>
            重置
          </Button>
          <Button key="submit" type="primary" onClick={handlerSubmit}>
            查询
          </Button>
          <a
            onClick={() => {
              setPutAway(!putAway);
            }}
          >
            {putAway ? '展开' : '收起'}
            {putAway ? <DownOutlined /> : <UpOutlined />}
          </a>
        </div>
      </div>
      <Row className={styles.searchFormFooter}>
        {props.footerRender ? props.footerRender() : <div />}
      </Row>
    </div>
  );
}

const BaseSearchForm = Form.create<IProps>({ name: 'searchOutboundInvoice' })(BaseSearch);

export default BaseSearchForm;
