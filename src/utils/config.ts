const packageConfig = require('../../package.json');

const config = {
  master: {
    api_prefix: 'https://master.xxx.com/api'
  },
  dev: {
    api_prefix: 'https://dev.xxx.com/api'
  },
};
export default config[API_ENV];
// 系统版本号
export const { version } = packageConfig; // 当前版本号
// iconfont文件地址（用于左侧菜单图标）
export const menuIconUrl = '//at.alicdn.com/t/font_2462703_397dif16a04.js';
