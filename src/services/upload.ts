import request from '@/utils/request';

/**
 * @method uploadImg
 * @description 上传图片
 * @param {any} file 上传的文件
 * @param {string} fieldName 上传到后端的字段名称
 * @return Promise
 */
export const uploadImg = (file: any, fieldName = 'file'): Promise<string> => {
  const formData = new FormData();
  formData.append(fieldName, file);
  return request('/upload', { method: 'post', data: formData });
};
