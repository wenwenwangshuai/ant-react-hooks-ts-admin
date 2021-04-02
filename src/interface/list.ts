import { EStatus } from "@/constants/list";
import { IQueryListParams } from "./common";

export interface IListReq {
  name: string;
  logo: string;
  status: EStatus;
  region_id: number;
}

export interface IMerchantListReq extends IQueryListParams {
  merchant_name: number;
  region_id: number;
  merchant_state: number;
  createTm: number[];
}

export interface IMerchantObj {
  id: number;
  name: string;
  logo: string;
  status: EStatus;
  region_name: string;
  create_dt: number;
}