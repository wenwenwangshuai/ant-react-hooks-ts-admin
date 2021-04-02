import { formColProps6Config, IFormFieldConfig, disabledDateAfterToday } from '@/utils/form';
import { FormType } from '@/constants/form';
import { IRegionObj } from '@/interface/common';
import { IMerchantListReq } from '@/interface/list';
import { statusOpt } from '@/constants/list';
import moment, { Moment } from 'moment';
import { datePickerFormat } from '@/constants';

const regisDateRangeConfig = {
  rules: [{ type: 'array', required: false, message: '请选择时间' }],
  format: datePickerFormat,
  initialValue: [moment(new Date()).subtract(29, 'days'), moment(new Date())],
};

export interface IFormProps extends IMerchantListReq {
  createTm: Moment[];
}

export function fieldsConfig({
  cityList,
}: {
  cityList: IRegionObj[];
}): IFormFieldConfig<keyof IFormProps>[] {
  return [
    {
      id: 'merchant_name',
      label: '商家名称',
      ...formColProps6Config,
      component: {
        type: FormType.Input,
        option: {
          placeholder: '请输入',
        },
      },
    },
    {
      id: 'createTm',
      label: '下单时间',
      ...formColProps6Config,
      component: {
        type: FormType.RangePicker,
        option: {
          placeholder: ['开始日期', '结束日期'],
          allowClear: true,
          disabledDate: disabledDateAfterToday,
        },
      },
      fieldOption: regisDateRangeConfig,
    },
    {
      id: 'region_id',
      label: '城市',
      ...formColProps6Config,
      component: {
        type: FormType.TreeSelect,
        option: {
          placeholder: '请选择',
          showSearch: true,
          allowClear: true,
          treeData: cityList,
          treeNodeFilterProp: 'title',
        },
      },
    },
    {
      id: 'merchant_state',
      label: '商家状态',
      ...formColProps6Config,
      component: {
        type: FormType.Select,
        option: {
          placeholder: '请选择',
          allowClear: true,
        },
        selectOptions: statusOpt,
      },
    },
    {
      id: 'merchant_name',
      label: '商家名称',
      ...formColProps6Config,
      component: {
        type: FormType.Input,
        option: {
          placeholder: '请输入',
        },
      },
    },
    {
      id: 'region_id',
      label: '城市',
      ...formColProps6Config,
      component: {
        type: FormType.TreeSelect,
        option: {
          placeholder: '请选择',
          showSearch: true,
          allowClear: true,
          treeData: cityList,
          treeNodeFilterProp: 'title',
        },
      },
    },
    {
      id: 'merchant_state',
      label: '商家状态',
      ...formColProps6Config,
      component: {
        type: FormType.Select,
        option: {
          placeholder: '请选择',
          allowClear: true,
        },
        selectOptions: statusOpt,
      },
    },
    {
      id: 'merchant_name',
      label: '商家名称',
      ...formColProps6Config,
      component: {
        type: FormType.Input,
        option: {
          placeholder: '请输入',
        },
      },
    },
    {
      id: 'region_id',
      label: '城市',
      ...formColProps6Config,
      component: {
        type: FormType.TreeSelect,
        option: {
          placeholder: '请选择',
          showSearch: true,
          allowClear: true,
          treeData: cityList,
          treeNodeFilterProp: 'title',
        },
      },
    },
    {
      id: 'merchant_state',
      label: '商家状态',
      ...formColProps6Config,
      component: {
        type: FormType.Select,
        option: {
          placeholder: '请选择',
          allowClear: true,
        },
        selectOptions: statusOpt,
      },
    },
  ];
}
