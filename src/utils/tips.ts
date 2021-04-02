import { message, Modal } from 'antd';
import { ReactNode } from 'react';

export default class zdsTips {
  // 成功提示
  static success(txt: string) {
    message.success(txt);
  }

  // 失败提示
  static error(txt: string) {
    message.error(txt);
  }

  // alert 提示
  static alert(txt: string | ReactNode, okFn: Function = () => {}) {
    Modal.info({
      content: txt,
      icon: null,
      onOk() {
        okFn();
      },
    });
  }

  // confirm 提示
  static confirm(txt: string, okFn: Function = () => {}, noFn: Function = () => {}) {
    const { confirm } = Modal;
    confirm({
      content: txt,
      onOk() {
        okFn();
      },
      onCancel() {
        noFn();
      },
    });
  }

  // 加载状态
  static loading(status: boolean, txt?: string) {
    if (status) {
      message.loading({
        content: txt || '加载中。。。',
        key: 'tipLoading',
        duration: 0
      })
    } else {
      message.loading({
        content: txt || '加载中。。。',
        key: 'tipLoading',
        duration: 0.01
      })
    }
  }
}
