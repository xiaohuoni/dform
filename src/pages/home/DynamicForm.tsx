import React, { FC, useEffect, useState } from 'react';
import { List, Button, WhiteSpace, Modal } from 'antd-mobile';
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
} from '../index/components';

const FormItemType = {
  input: NomarInput,
  text: OnlyReadInput,
  select: NomarPicker,
  area: NomarTextArea,
  date: NomarDatePicker,
  switch: NomarSwitch,
};

export interface IFormItemProps {
  type: 'input' | 'text' | 'select' | 'area' | 'date';
  title: string;
  fieldProps: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  data?: [];
  inputType?: InputItemPropsType['type'];
  modeType?: DatePickerPropsType['mode'];
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

interface NewFieldPickerProps {
  onChange?: (t: any) => void;
  value?: [];
}
const NewFieldPicker: FC<NewFieldPickerProps> = ({ onChange, value }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setModal(true)}>
        新增表单
      </Button>
      <WhiteSpace />
      <Modal popup visible={modal} onClose={() => setModal(false)} animationType="slide-up">
        <List renderHeader={() => <div>选择表单类型</div>}>
          <Button type="primary" onClick={() => onChange && onChange('1')}>
            完成
          </Button>
        </List>
      </Modal>
    </>
  );
};

const DynamicForm: FC<IDynamicFormProps> = ({
  children,
  data,
  form,
  allDisabled = false,
  formsValues,
  onFinish,
  onFinishFailed,
  isDev = nodeEnvIsDev,
}) => {
  useEffect(() => {
    form.setFieldsValue(formsValues as Store);
  }, [formsValues]);
  const getFormItem = (formItem: IFormItemProps, allDisabled: boolean) => {
    const { type, disabled = allDisabled, ...otherProps } = formItem;
    const FormItemComponent = FormItemType[formItem.type];
    return <FormItemComponent {...otherProps} key={formItem.fieldProps} disabled={disabled} />;
  };
  const defaultFailed = (errorInfo: ValidateErrorEntity) => {
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
  return (
    <Form
      form={form}
      initialValues={formsValues}
      onFinish={onFinish}
      onFinishFailed={defaultFailed}
    >
      <List>
        {data.map(item => getFormItem(item, allDisabled))}
        {isDev && data.length === 0 && (
          <Field name="alitaDformExtraField">
            <NewFieldPicker />
          </Field>
        )}
      </List>
      {children}
    </Form>
  );
};

export default DynamicForm;
