import moment, { Moment } from 'moment';
import { message } from 'antd';

moment.locale('zh-cn');

export const momentZhCn = moment; // 中文moment

export const getBeginTimestamp = (date: Date): number =>
  new Date(date.toDateString()).getTime() / 1000;

export const getEndTimestamp = (date: Date): number =>
  new Date(`${date.toDateString()} 23:59:59`).getTime() / 1000;

export const getQueryRangeDate = (dates: Moment[]) => [
  getBeginTimestamp(new Date(dates[0].unix() * 1000)),
  getEndTimestamp(new Date(dates[1].unix() * 1000)),
];

/**
 * @method limitUploadSize
 * @description 限制上传文件大小
 * @param {number} fileSize 文件大小（单位b）
 * @param {number} limitSize 限制文件大小（单位M）
 * @return boolean
 */
export const limitUploadSize = (fileSize: number, limitSize: number) => {
  const result: boolean = fileSize / 1024 / 1024 > limitSize;
  if (result) {
    message.error(`图片大小不能超过${limitSize}M`);
  }
  return result;
};

/**
 * @method filterImageType
 * @description 限制图片格式
 * @param {string} fileType 文件类型
 * @param {boolean} isMessage 是否播报
 * @return boolean
 */
export const filterImageType = (fileType: string, isMessage = false): boolean => {
  const flag = !!fileType.match(/image\/(png|jpg|jpeg)$/);
  if (isMessage && !flag) {
    message.error('请上传jpg、png、jpeg格式的图片！');
  }
  return flag;
};
