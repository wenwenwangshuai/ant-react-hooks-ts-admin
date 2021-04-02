import { ISelectOptions } from "@/utils/form";

export enum EStatus {
  On = 'On',
  Off = 'Off'
}

export const statusOpt: ISelectOptions[] = [
  { value: EStatus.On, label: '开启', color: 'blue' },
  { value: EStatus.Off, label: '关闭', color: 'red' },
];