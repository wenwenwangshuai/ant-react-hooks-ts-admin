/** 列表通用limit参数 */
export const limit = 10;

/**
 * 百分比转换单位
 * 例子：后端传 1，实际展示应该等于 1/percentDenominator + '%'
 * */
export const percentDenominator = 100;

/**
 * rmb转换单位
 * 后端传的rmb 比例 1:10000
 * */
export const moneyMillion = 10000;

/**
 * 时间转换单位
 * 后端传的事件单位都是秒级别的，所以需要*1000编程毫秒级别然后换算日期
 * */
export const timeDenominator = 1000;

/** 日期选择 */
export const datePickerFormat = 'YYYY/MM/DD';

// 媒体类型
export enum MediaType {
  image,
  video,
  pdf,
}
