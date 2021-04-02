import { FormType } from '@/constants/form';
import { formColProps24Config, IFormFieldConfig } from '@/utils/form';
import { statusOpt, EStatus } from '@/constants/list';
import { IListReq } from '@/interface/list';
import { IRegionObj } from '@/interface/common';

export const fieldsConfig = (cityList: IRegionObj[]): IFormFieldConfig<keyof IListReq>[] => [
  {
    id: 'name',
    label: '名称',
    ...formColProps24Config,
    component: {
      type: FormType.Input,
      option: {
        placeholder: '请输入',
      },
    },
    fieldOption: {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    },
  },
  {
    id: 'region_id',
    label: '城市',
    ...formColProps24Config,
    component: {
      type: FormType.TreeSelect,
      option: {
        placeholder: '请选择(可搜索)',
        showSearch: true,
        allowClear: true,
        treeData: cityList,
        treeNodeFilterProp: 'title',
      },
    },
  },
  {
    id: 'status',
    label: '状态',
    ...formColProps24Config,
    component: {
      type: FormType.Select,
      option: {
        placeholder: '请选择',
        allowClear: true,
      },
      selectOptions: statusOpt,
    },
    fieldOption: {
      initialValue: EStatus.On,
      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
    },
  },
]