import React, { FC, useState } from 'react';
import { List, Button, WhiteSpace } from 'antd-mobile';
import Form, { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';

import { IFormItemProps } from './DynamicForm';

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

export interface IEditFormProps {
  data?: IFormItemProps; // 动态表单数据
  onChange?: (data: any) => void;
}

const EditFormItemLabel = {
  title: '标题',
  fieldProps: '绑定关键字',
  required: '是否必填',
  placeholder: '输入提示',
  disabled: '是否可编辑',
  data: '表单数据',
  inputType: '输入框类型',
  modeType: '选择器类型',
  fieldProps2: '副绑定关键字',
  placeholder2: '副输入提示',
};
// inputType:'text' | 'bankCard' | 'phone' | 'password' | 'number' | 'digit' | 'money';
// modeType:mode?: 'datetime' | 'date' | 'year' | 'month' | 'time';
const EditFormItemType = {
  title: NomarInput,
  fieldProps: NomarInput,
  required: NomarRadio,
  placeholder: NomarInput,
  disabled: NomarRadio,
  data: NomarInput,
  inputType: (props: any) => (
    <NomarPicker
      data={[
        ['text', 'bankCard', 'phone', 'password', 'number', 'digit', 'money'].map(
          (item: string) => ({
            value: item,
            label: item,
          }),
        ),
      ]}
      cols={1}
      {...props}
    />
  ),
  modeType: (props: any) => (
    <NomarPicker
      data={[
        ['datetime', 'date', 'year', 'month', 'time'].map((item: string) => ({
          value: item,
          label: item,
        })),
      ]}
      cols={1}
      {...props}
    />
  ),
  fieldProps2: NomarInput,
  placeholder2: NomarInput,
};
const getFormItem = (fieldItemKey: string) => {
  const EditFormItemComponent = EditFormItemType[fieldItemKey];
  const title = EditFormItemLabel[fieldItemKey];
  return (
    <EditFormItemComponent
      key={`alita-dform-edit-${fieldItemKey}`}
      fieldProps={fieldItemKey}
      title={title}
    />
  );
};

const getShowDeitItem = (editData?: IFormItemProps) => {
  if (!editData) return;
  let { type, inputType, modeType, ...otherProps } = editData as any;
  // 选择类型的初始值要手动转化一下 2/3
  if (inputType) {
    inputType = inputType[0] as InputItemPropsType['type'];
    otherProps.inputType = inputType;
  }
  if (modeType) {
    modeType = modeType[0] as DatePickerPropsType['mode'];
    otherProps.modeType = modeType;
  }
  const ShowItemComponent = FormItemType[type];
  return <ShowItemComponent {...otherProps} />;
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

const EditForm: FC<IEditFormProps> = ({ data = [] as any, onChange }) => {
  const [form] = useForm();
  // 选择类型的初始值要手动转化一下 1/3
  if (data.inputType) {
    data.inputType = [data.inputType];
  }
  if (data.modeType) {
    data.modeType = [data.modeType];
  }
  const [editData, setEditData] = useState(data);
  const onFinish = (values: Store) => {
    console.log('Success:', values);
    onChange && onChange(values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ textAlign: 'left' }}>
      <List renderHeader={() => '效果演示'}>{getShowDeitItem(editData)}</List>
      <Form
        form={form}
        initialValues={editData}
        onFinish={onFinish}
        onFinishFailed={(errorInfo: ValidateErrorEntity) =>
          defaultFailed(errorInfo, onFinishFailed)
        }
        onValuesChange={changFeil => {
          const newData = { ...editData, ...changFeil } as IFormItemProps;
          setEditData(newData);
        }}
      >
        <List renderHeader={() => '编辑数据'}>
          {Object.keys(data || {})
            .filter(i => i !== 'type' && i !== 'data')
            .map(fieldItemKey => getFormItem(fieldItemKey))}
        </List>
        <WhiteSpace size="lg"></WhiteSpace>

        <Field>
          <Button type="primary" onClick={() => form.submit()}>
            完成
          </Button>
        </Field>
      </Form>
    </div>
  );
};

export default EditForm;
