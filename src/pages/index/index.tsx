import React, { FC } from 'react';
import { Button, List } from 'antd-mobile';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import PositionIcon from './assets/position_ico.png';

import {
  NomarInput,
  NomarPicker,
  NomarSwitch,
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
];

const DynamicForm: FC<DynamicFormProps> = props => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: Store) => {
    console.log('Failed:', errorInfo);
  };

  const extraImg = () => {
    return <img src={PositionIcon} onClick={e => console.log(e)} />;
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{
        username: '123',
        userRadio2: 'no',
        userRadio1: 'yes',
        userClick: '文字点击事件',
        userImgClick: 'extra展示',
        datePicker1: new Date(),
        userEditable: '用户不可编辑',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <List>
        <NomarInput
          fieldProps="username"
          required
          placeholder="请输入"
          title="用户名"
          inputType="text"
        />
        <NomarInput
          editable={false}
          fieldProps="userEditable"
          required
          placeholder="请选择"
          title="用户选择"
        />
        <NomarInput
          fieldProps="userClick"
          required
          placeholder="点击事件"
          title="点击文字"
          editable={false}
          onClick={e => console.log(e)}
          extra="¥"
        />
        <NomarInput
          fieldProps="userImgClick"
          required
          placeholder="点击事件"
          title="图片div"
          editable={false}
          extra={extraImg()}
        />
        <NomarPicker
          fieldProps="userdata"
          required
          placeholder="请选择"
          title="用户数据"
          data={seasons}
        />
        <NomarDatePicker
          fieldProps="userDataPicker"
          required
          placeholder="请选择"
          title="用户时间选择"
          modeType="month"
        />
        <NomarSwitch fieldProps="userswitch" required placeholder="请选择" title="用户选择" />
        <RangeDatePicker
          fieldProps="datePicker1"
          fieldProps2="datePicker2"
          required
          title="时间(datetime)"
          modeType="datetime"
          minDate={new Date()}
          maxDate={new Date()}
        />
        <RangeDatePicker
          fieldProps="datePicker3"
          fieldProps2="datePicker4"
          required
          title="时间(month)"
          modeType="month"
        />
        <NomarRadio fieldProps="userRadio1" required title="用户选择1" data={radioList} />
        <NomarRadio
          fieldProps="userRadio2"
          required
          title="用户选择2"
          data={radioList}
          radioType="vertical"
        />
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
