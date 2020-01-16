import React, { FC } from 'react';
import { Button, List } from 'antd-mobile';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';

import {
  NomarInput,
  NomarPicker,
  NomarSwitch,
  OnlyReadInput,
  NomarTextArea,
  NomarDatePicker,
  NomarRadio,
  RangeDatePicker,
} from './components';

interface DynamicFormProps {}

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
]

const DynamicForm: FC<DynamicFormProps> = props => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: Store) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ username: '', userRadio2: 'no', userRadio1: 'yes' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <List>
        <NomarInput fieldProps="username" required  placeholder="请输入" title="用户名" inputType="text"/>
        <NomarPicker fieldProps="userdata" required placeholder="请选择" title="用户数据" data={seasons} />
        <NomarSwitch fieldProps="userswitch" required placeholder="请选择" title="用户选择" />
        <OnlyReadInput fieldProps="userswitch" required placeholder="请选择" title="用户选择" />
        <NomarTextArea fieldProps="usertextarea" required placeholder="请选择" title="用户选择" />
        <NomarDatePicker fieldProps="userDataPicker" required placeholder="请选择" title="用户时间选择" modeType="datetime" />
        <NomarRadio fieldProps="userRadio1" required placeholder="请选择" title="用户选择1" data={radioList} />
        <NomarRadio fieldProps="userRadio2" required placeholder="请选择" title="用户选择2" data={radioList} radioType="vertical" />
      </List>
      <Field {...tailLayout}>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </Field>
    </Form>
  );
};

export default DynamicForm;
