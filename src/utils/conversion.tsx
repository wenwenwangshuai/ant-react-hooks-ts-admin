import moment, { Moment } from 'moment';
import { moneyMillion, percentDenominator, timeDenominator } from '@/constants';

// 转换时间
export function conversionDateTime(
  time: number | Date,
  cFormat = '{y}-{m}-{d} {h}:{i}:{s}',
): string {
  if (arguments.length === 0) {
    return '--';
  }
  let date: Date;
  if (time instanceof Date) {
    date = time as Date;
  } else if (time <= 0) {
    return '--'
  } else {
    date = new Date((time as number) * timeDenominator);// 项目中约定好所有的时间戳是秒级别
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return cFormat.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
}

// 计算时间相差天数
export const dateDifference = (time: number): string => {
  if (time) {
    const currentDayStr = conversionDateTime(new Date().getTime() / 1000, '{y}-{m}-{d}');
    const difDayStr = conversionDateTime(time, '{y}-{m}-{d}');

    const currentDay = new Date(`${currentDayStr} 00:00:00`).getTime();
    const difDay = new Date(`${difDayStr} 00:00:00`).getTime();

    const diffTime = currentDay - difDay;
    const day = Math.floor(Math.abs(diffTime) / 24 / 3600 / 1000);
    return day === 0 ? '今天' : day + (diffTime < 0 ? '天后' : '天前');
  }
  return '今天';
}

/**
 * @method conversionNumberToMoment
 * @description 转换时间 将number 转成 Moment
 * @param {number} time 后端约定好的时间戳都是秒级
 * @return return  Moment
 */
export const conversionNumberToMoment = (time: number = new Date().getTime()): Moment =>
  moment(new Date(time * timeDenominator));

/**
 * @method conversionUnit
 * @description 转换金钱单位
 * @param {number} value
 * @return number
 * @example conversionMoneyUnit（1000） // ￥1
 */
export const conversionMoneyUnit = (value: number): string => {
  if (!value) {
    return '0';
  }
  return value >= 0
    ? `￥${(Math.round(value / moneyMillion * 100) / 100).toString()}`
    : `-￥${(Math.abs(Math.round(value / moneyMillion * 100) / 100)).toString()}`;
}

// 后端返回的金额转换为前端展示的元
export const moneyToInput = (value: number, fixed = 2): number => {
  if (!+value) {
    return 0
  }
  return +(Math.round(value / moneyMillion * 100) / 100).toFixed(fixed)
}

// 前端输入的元转换为后端所需的厘
export const inputToMoney = (value?: number): number => {
  const num = value || 0
  if (!+num) {
    return 0
  }
  return +num * moneyMillion
}

// number和百分比
export const conversionNumberToPercent = (
  value: number | string
): number | string => {
  return `${Number(value) / percentDenominator}%`;
};
