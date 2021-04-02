import React, { useEffect, useState } from 'react';
import { Form } from '@ant-design/compatible';
import { Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { filterImageType, limitUploadSize } from '@/utils';
import { uploadImg } from '@/services/upload';
import Tips from '@/utils/tips';
import { UploadFile } from 'antd/lib/upload/interface';
import { WrappedFormUtils, ValidationRule } from '@ant-design/compatible/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

interface IProps {
  imgList: string[]; // 图片列表
  label: string; // 标题
  rules?: ValidationRule[]; // 表单验证规则
  fieldId?: string; // form 表单的id名称
  maxNum?: number; // 最大上传数量，默认1
  disabled?: boolean; // 是否禁用，默认false
  setImgList: (list: string[]) => void; // 上传图片回调
  form: WrappedFormUtils<any>;
  formItemProps?: FormItemProps; // 和 Form.Item的用法相似
}

// 上传图片组件
const UploadImg: React.FC<IProps> = ({
  imgList,
  label,
  fieldId = 'imgList',
  maxNum = 1,
  disabled = false,
  setImgList = () => {},
  form: { getFieldDecorator },
  formItemProps,
  rules = [],
}: IProps) => {
  const [fileList, setFileList] = useState<string[]>([]); // 当前图片列表
  const [loading, setLoading] = useState<boolean>(false); // 加载中
  useEffect(() => {
    setFileList(imgList);
  }, [imgList]);
  // 上传前校验 大小 和 图片类型
  const beforeUpload: (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void> = (
    file: RcFile,
  ) => {
    if (filterImageType(file.type)) {
      setLoading(true);
      if (!limitUploadSize(file.size, 5)) {
        uploadImg(file)
          .then(resp => {
            Tips.success('文件上传成功');
            setImgList([...fileList, resp]);
          })
          .catch(() => {
            Tips.error(`${file.name} 文件上传失败`);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      Tips.error('只支持png、jpg、jpeg格式的文件');
    }
    return false;
  };

  const uploadFileList = (): UploadFile<any>[] =>
    imgList.map((item, index) => ({
      uid: index.toString(),
      size: 1,
      name: 'image',
      status: 'done',
      type: '',
      url: item,
    }));

  // 上传图片按钮
  const uploadButton = (
    <div className={styles.uploadButton}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className={styles.antUploadText}>上传</div>
    </div>
  );

  // 移除
  const onRemove = (file: UploadFile) => {
    const newList = fileList.concat([]);
    newList.splice(+file.uid, 1);
    setImgList(newList);
    return false;
  };

  return (
    <Form.Item label={label} {...formItemProps} labelAlign='right'>
        {getFieldDecorator(fieldId, {
          valuePropName: 'file',
          rules,
        })(
          <Upload
            fileList={uploadFileList()}
            beforeUpload={beforeUpload}
            accept=".jpg,.png,.jpeg"
            listType="picture-card"
            onRemove={onRemove}
          >
            {!disabled && imgList.length < maxNum ? uploadButton : null}
          </Upload>,
        )}
      </Form.Item>
  );
};

export default UploadImg;
