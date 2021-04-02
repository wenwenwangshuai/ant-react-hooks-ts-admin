// 手机号码
export function validateMobile(str: string) {
  const reg = /^1\d{10}$/;
  return reg.test(str);
}

/* 小写字母 */
export function validateLowerCase(str: string) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
export function validateUpperCase(str: string) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validatAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

// 验证正整数 x > waitRecipt
export function isPositiveInteger(str: string) {
  const reg = /^[1-9]\d*$/;
  return reg.test(str);
}

// 验证大于等于0自然数
export function isNaturalNumber(str: string) {
  const reg = /^[0-9]\d*$/;
  return reg.test(str);
}

// 验证小数 限制 x >= waitRecipt.00
export function isPositiveFloatLimit(str: string) {
  const reg = /^\d+\.?\d{0,2}$/;
  return reg.test(str);
}

// 验证 waitRecipt~100 小数
export function isPositiveHundredFloat(str: string) {
  const reg = /^\d+\.?\d{0,2}$/;
  const flag = reg.test(str) && Number(str) < 100;
  return flag;
}

// 验证是否包含中文
export function isChineseChar(str: string) {
  const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}

// 验证是否是身份证号码
export function isCardNo(str: string) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(str);
}

// 银行卡号格式验证
export function isBank(num: string) {
  const reg = /^([1-9]{1})(\d{8,20})$/;
  return reg.test(num);
}

// 是否是网站链接地址
export function validateURL(url: string) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
  return reg.test(url);
}
