import React, { useState, useEffect } from 'react';
import { Form } from '@ant-design/compatible';
import { Row, Col, Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { getFormFields, formColProps24Config } from '@/utils/form';
import zdsTips from '@/utils/tips';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import { useDispatch } from 'dva';
import { fieldsConfig } from './fieldsConfig';
import UploadImg from '@/components/UploadImg'
import styles from './index.less';
import FormLayout from './components/FormLayout';
import { IRegionObj } from '@/interface/common';
import EditorView from '@/components/EditorView';
import { EStatus } from '@/constants/list';

const FormView: React.FC<FormComponentProps> = (props: any) => {
  const [postLoad, setPostLoad] = useState(false); // 请求状态
  const [thumbnailUrl, setThumbnailUrl] = useState<string[]>([]) // 缩略图
  const [editorState, setEditorState] = useState<any>();// 任务描述-富文本内容
  const [cityList, setCityList] = useState<IRegionObj[]>([]); // 省市区列表
  const { getFieldDecorator, setFieldsValue } = props.form;
  const dispatch = useDispatch();

  useEffect(() => {
    setFieldsValue({
      status: EStatus.On,
    })
    dispatch({
      type: 'global/getModelRegionList',
      callback: (list: IRegionObj[]) => {
        setCityList(list);
      },
    });
  }, []);

  const handleSubmit = () => {
    if (postLoad) {
      return;
    }
    if (thumbnailUrl.length === 0) {
      zdsTips.error('请上传店铺logo')
      return
    }
    const detailHtml = editorState ? editorState.toHTML() : ''
    const { validateFields } = props.form;
    validateFields((err: any, values: any) => {
      if (!err) {
        console.log(detailHtml,values)
      }
    });
  };

  const cancelHandel = () => {
    // 返回任务列表
    router.replace('/merchant/list');
  }

  const fieldsConfigList = fieldsConfig(cityList);

  return (
    <PageHeaderWrapper className={styles.productManage}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitle}>新增店铺</div>
        <div className={styles.operation}>
          <Button onClick={cancelHandel}>取消</Button>
          <Button type="primary" onClick={handleSubmit}>保存并返回</Button>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col {...formColProps24Config.colProps}>
            <UploadImg formItemProps={{ ...formColProps24Config.formItemProps, required: true }} setImgList={setThumbnailUrl} imgList={thumbnailUrl} form={props.form} label='logo(400*400)' />
          </Col>
          {getFormFields(
            getFieldDecorator,
            fieldsConfigList,
          )}
        </Row>
      </Form>
      {/* 富文本编辑器-start */}
      <FormLayout title="店铺介绍">
        <EditorView placeholder='店铺介绍' editorState={editorState} setEditorState={setEditorState} />
      </FormLayout>
      {/* 富文本编辑器-end */}
    </PageHeaderWrapper>
  );
};

export default Form.create<FormComponentProps>({ name: 'FormView' })(FormView);
