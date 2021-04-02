import React, { useState } from 'react';
import {Card, Steps, Button, Input, Result} from 'antd';
import { Form } from '@ant-design/compatible';
import { FormItemProps } from 'antd/lib/form';
import router from 'umi/router';

const {Step} = Steps;
import styles from './index.less';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import tips from "@/utils/tips";
import {checkCaptcha, modifyPwdByEmail, sendEmail} from "@/services/user";

const steps = [
  {
    title: '用户邮箱',
  },
  {
    title: '邮箱验证码',
  },
  {
    title: '新密码',
  },
  {
    title: '完成',
  },
];

const RetrievePwd: React.FC<FormComponentProps> = (props: FormComponentProps) => {
  const [current, setCurrent] = useState<number>(0);
  const [confirmDirty, setConfirmDirty] = useState<boolean>(false);
  const [sendEmailLoading, setSendEmailLoading] = useState<boolean>(false);
  const [checkVerityCodeLoading, setCheckVerityCodeLoading] = useState<boolean>(false);
  const [modifyPwdByEmailLoading, setModifyPwdByEmailLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [verifyCode, setVerifyCode] = useState<string>();
  const {getFieldDecorator} = props.form;

  const next = () => {
    const {form} = props;

    if (current === 0) {
      form.validateFields((errors: any, values: any) => {
        if (errors) return;
        setSendEmailLoading(true);
        sendEmail({email: values.email})
          .then(res => {
            tips.success('验证码已发送至邮箱');
            setCurrent(current + 1);
            setEmail(values.email);
            setVerifyCode('');
            setSendEmailLoading(false);
          }).catch();
      });
    }
    if (current === 1) {
      form.validateFields((errors: any, values: any) => {
        if (errors) return;
        if (!email) {
          tips.error('请输入邮箱');
          return;
        }
        setCheckVerityCodeLoading(true);
        checkCaptcha({email: email, code: values.verifyCode})
          .then(res => {
            setCurrent(current + 1);
            setVerifyCode(values.verifyCode);
            setCheckVerityCodeLoading(false);
          }).catch();
      });
    }
  }

  const prev = () => {
    setCurrent(current - 1);
  }

  const submitPwd = () => {
    const {form} = props;
    form.validateFields((errors: any, values: any) => {
      if (errors) return;
      if (!email) {
        tips.error('请输入邮箱');
        return;
      }
      if (!verifyCode) {
        tips.error('请校验验证码');
        return;
      }
      setModifyPwdByEmailLoading(true);
      modifyPwdByEmail({
        email: email,
        pwd: values.pwd,
        code: verifyCode
      })
        .then(res => {
          setModifyPwdByEmailLoading(false);
          next();
        }).catch();
    });
  };

  const formLayout: FormItemProps = {
    labelCol: {span: 7},
    wrapperCol: {span: 13},
    children: null
  };

  const formInputWid = {
    width: 300,
  };

  const handleConfirmBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule: object[], value: string, callback: Function) => {
    const {form} = props;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('密码输入不一致');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule: object[], value: string, callback: Function) => {
    const {form} = props;
    if (value && confirmDirty) {
      form.validateFields(['confirmPwd'], {force: true});
    }
    callback();
  };

  return (
    <Card title='找回密码' className={styles.retrievePwdBox}>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      <div className={styles.stepsContent}>
        <Form hideRequiredMark={true}>
          {current === 0 && (
            <Form.Item label='邮箱' {...formLayout}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/g,
                    message: '请输入正确的邮箱',
                  },
                ],
                initialValue: email
              })(<Input placeholder='输入邮箱' style={formInputWid}/>)}
            </Form.Item>
          )}
          {current === 1 && (
            <Form.Item label='验证码' {...formLayout}>
              {getFieldDecorator('verifyCode', {
                rules: [
                  {
                    required: true,
                    pattern: /^\s*[0-9]{6}\s*$/g,
                    message: '请输入6位验证码',
                  },
                ],
                initialValue: verifyCode
              })(<Input placeholder='输入验证码' style={formInputWid}/>)}
            </Form.Item>
          )}
          {current === 2 && (
            <div>
              <Form.Item label="新密码" {...formLayout}>
                {getFieldDecorator('pwd', {
                  rules: [
                    {
                      required: true,
                      min: 6,
                      max: 16,
                      message: '请输入新密码（6-16位）',
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                  initialValue: ''
                })(<Input.Password placeholder='输入新密码' style={formInputWid}/>)}
              </Form.Item>
              <Form.Item label="确认密码" {...formLayout}>
                {getFieldDecorator('confirmPwd', {
                  rules: [
                    {
                      required: true,
                      min: 6,
                      max: 16,
                      message: '请输入确认密码（6-16位）',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                  initialValue: ''
                })(<Input.Password
                  placeholder='输入确认密码'
                  style={formInputWid}
                  onBlur={handleConfirmBlur}/>)}
              </Form.Item>
            </div>
          )}
        </Form>
        {current === 3 && (
          <Result
            status="success"
            title="密码修改成功"
            subTitle="可转至登录页重新登录"
            extra={[
              <Button type="primary" key="console" onClick={(): void => {
                router.push(`/user/login`);
              }}>去登录</Button>,
            ]}
          />
        )}
      </div>
      <div className={styles.stepsAction} style={{textAlign: 'right'}}>
        {current > 0 && current < steps.length - 1 && (
          <Button onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current === steps.length - 2 && (
          <Button type="primary" style={{marginLeft: 8}} onClick={() => submitPwd()} loading={modifyPwdByEmailLoading}>
            完成
          </Button>
        )}
        {current === 0 && (
          <Button type="primary" style={{marginLeft: 8}} onClick={() => next()} loading={sendEmailLoading}>
            下一步
          </Button>
        )}
        {current === 1 && (
          <Button type="primary" style={{marginLeft: 8}} onClick={() => next()} loading={checkVerityCodeLoading}>
            下一步
          </Button>
        )}
      </div>
    </Card>
  );
}

export default Form.create<FormComponentProps>({ name: 'RetrievePwd' })(RetrievePwd);
