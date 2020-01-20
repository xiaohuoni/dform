import React, { FC } from 'react';
import { Field } from 'rc-field-form';
import { List } from 'antd-mobile';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio/interface';

import styles from '../../styles/index.less';

interface radioItem {
  label: string;
  value: string;
}

export interface INomarRadioProps extends RadioGroupProps {
  fieldProps: string;
  title: string;
  rules?: [];
  required?: boolean;
  placeholder?: string;
  data?: radioItem[] | [];
  radioType?: 'horizontal' | 'vertical';
  coverStyle?: React.CSSProperties;
}

const radioList = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

const NomarRadio: FC<INomarRadioProps> = props => {
  const {
    coverStyle,
    fieldProps,
    required = false,
    rules,
    title,
    placeholder,
    data = radioList as any,
    radioType = 'horizontal',
    ...otherProps
  } = props;

  const RadioGroup = () => {
    return (
      <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
        <Radio.Group className={styles.fixRadioStyle} style={coverStyle} {...otherProps}>
          {data.map((item: radioItem) => (
            <Radio key={item.label} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Field>
    );
  };

  if (radioType === 'vertical') {
    return (
      <div className={styles.fixRadioVerticalStyle} key={fieldProps} style={coverStyle}>
        <p>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps}>{title}</span>
        </p>
        {
          <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
            <Radio.Group className={styles.fixRadioStyle} style={coverStyle} {...otherProps}>
              {data.map((item: radioItem) => (
                <Radio key={item.label} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </Radio.Group>
          </Field>
        }
      </div>
    );
  }

  return (
    <List.Item key={fieldProps} style={coverStyle} extra={RadioGroup()}>
      {required && <span className={styles.redStar}>*</span>}
      {title}
    </List.Item>
  );
};

export default NomarRadio;
