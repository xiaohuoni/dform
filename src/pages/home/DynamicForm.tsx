import React, { FC, useEffect } from 'react';
import { List } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import Form, { Field } from 'rc-field-form';
import { Store, FormInstance, ValidateErrorEntity } from 'rc-field-form/es/interface';

import {
  NomarInput,
  NomarPicker,
  NomarSwitch,
  OnlyReadInput,
  NomarTextArea,
  NomarDatePicker,
  ExtraInput,
  RangeDatePicker,
  NomarRadio,
} from '../index/components';

import NewFieldPicker from './NewFieldPicker';

const FormItemType = {
  input: NomarInput,
  text: OnlyReadInput,
  select: NomarPicker,
  area: NomarTextArea,
  date: NomarDatePicker,
  switch: NomarSwitch,
  radio: NomarRadio,
  extraInput: ExtraInput,
  rangeDatePicker: RangeDatePicker,
};

export interface IFormItemProps {
  type:
    | 'input'
    | 'text'
    | 'select'
    | 'area'
    | 'date'
    | 'switch'
    | 'extraInput'
    | 'radio'
    | 'rangeDatePicker';
  title: string;
  fieldProps: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  data?: any[];
  inputType?: InputItemPropsType['type'];
  modeType?: DatePickerPropsType['mode'];
  fieldProps2?: string;
  placeholder2?: string;
}

export interface IDynamicFormProps {
  data: IFormItemProps[]; // 动态表单数据
  form: FormInstance; // 表单对象
  formsValues?: Store;
  allDisabled?: boolean; // 全部不可交互，展示状态
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
  isDev?: boolean; // 手动声明是开发模式
}

const nodeEnvIsDev = process.env.NODE_ENV === 'development';

export const getFormItem = (formItem: IFormItemProps, allDisabled: boolean) => {
  console.log(formItem);

  const { type, disabled = allDisabled, ...otherProps } = formItem;
  const FormItemComponent = FormItemType[formItem.type];
  return <FormItemComponent {...otherProps} key={formItem.fieldProps} disabled={disabled} />;
};

export const defaultFailed = (
  errorInfo: ValidateErrorEntity,
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void,
) => {
  if (!errorInfo || !errorInfo.errorFields || errorInfo.errorFields.length === 0) {
    onFinishFailed && onFinishFailed(errorInfo);
    return;
  }
  const scrollToField = (fieldKey: any) => {
    const labelNode = document.getElementById(`aliat-dform-${fieldKey}`);
    if (labelNode) {
      labelNode.scrollIntoView(true);
    }
  };
  scrollToField(errorInfo.errorFields[0].name[0]);
  onFinishFailed && onFinishFailed(errorInfo);
};

const DynamicForm: FC<IDynamicFormProps> = ({
  children,
  data,
  form,
  allDisabled = false,
  formsValues = {},
  onFinish,
  onFinishFailed,
  isDev,
}) => {
  useEffect(() => {
    form.setFieldsValue(formsValues as Store);
  }, [formsValues]);

  const showAddItem = isDev || (nodeEnvIsDev && data.length === 0);

  return (
    <>
      <Form
        form={form}
        initialValues={formsValues}
        onFinish={onFinish}
        onFinishFailed={(errorInfo: ValidateErrorEntity) =>
          defaultFailed(errorInfo, onFinishFailed)
        }
        onValuesChange={changFeil => {
          console.log(changFeil);
        }}
      >
        <List>{data.map(item => getFormItem(item, allDisabled))}</List>
        {children}
      </Form>
      {showAddItem && <NewFieldPicker />}
    </>
  );
};

export default DynamicForm;
