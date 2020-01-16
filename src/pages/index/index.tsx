import React, { FC } from 'react';
import { Button, List } from 'antd-mobile';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';

import { NomarInput, NomarPicker,NomarSwitch,OnlyReadInput,NomarTextArea } from './components';

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
      initialValues={{ username: '' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <List>
        <NomarInput fieldProps="username" required  placeholder="请输入" title="用户名" inputType="text"/>
        <NomarPicker fieldProps="userdata" required placeholder="请选择" title="用户数据" data={seasons} />
        <NomarSwitch fieldProps="userswitch" required placeholder="请选择" title="用户选择" />
        <OnlyReadInput fieldProps="userswitch" required placeholder="请选择" title="用户选择" />
        <NomarTextArea fieldProps="usertextarea" required placeholder="请选择" title="用户选择" />
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
