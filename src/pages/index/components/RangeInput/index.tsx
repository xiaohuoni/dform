import React, { FC } from 'react';
import { InputItem } from 'antd-mobile';
import { Field } from 'rc-field-form';

import { INomarInputProps } from '../NomarInput';
import styles from '../../styles/index.less';
import { NomarInput } from '../';

export interface IRangeInputProps extends INomarInputProps {
  fieldProps2: string;
}

const RangeInput: FC<IRangeInputProps> = props => {
  const {
    inputType,
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    imgExtra,
    imgExtraClick,
    fieldProps2,
    ...otherProps
  } = props;
  return (
    <div className={styles.rangeInputStyle}>
      <div className={styles.beginRangeInputStyle}>
        <NomarInput {...props} />
      </div>
      <div className={styles.line}>——</div>
      <div className={styles.endRangeInputStyle}>
        <Field name={fieldProps2} rules={rules || [{ required, message: `请输入${title}` }]}>
          <InputItem {...otherProps} type={inputType} style={{ ...coverStyle }} />
        </Field>
      </div>
    </div>
  );
};

export default RangeInput;
