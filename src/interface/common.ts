import { Moment } from 'moment';

export interface IDictionary {
  [code: string]: string;
}

export interface IOption<V = string | number> {
  value: V;
  label: string;
}
export interface IOptions<T = string> {
  [typeName: string]: IOption<T>;
}
export interface IQueryListParams {
  offset: number; // 偏移量（第一页为0）
  limit: number; // 每页条数
}

export interface IListItem {
  key: string;
}
// 时间类型
export type IFormDate = number | Moment | null | string;
// 空返回体
export type IRespEmpty = Promise<{}>;

// 省市区列表
export interface IRegionListObj {
  region_id: number; // 区域Id
  region_name: string; // 区域名称
  t: string; // 区域类型
  pid: number; // 父区域id
  children: Array<IRegionListObj>; // 子区域
}

export interface IRegionObj {
  value: number;
  label: string;
  selectable?: boolean;
  children?: IRegionObj[];
}