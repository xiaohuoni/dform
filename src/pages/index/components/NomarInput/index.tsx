import React, { FC } from 'react';
import { InputItem } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Field } from 'rc-field-form';

import styles from '../../styles/index.less';

export interface INomarInputProps extends InputItemPropsType {
  inputType: InputItemPropsType['type'];
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  imgExtra?: any;
  imgExtraClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const NomarInput: FC<INomarInputProps> = props => {
  const {
    inputType,
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    imgExtra,
    imgExtraClick,
    ...otherProps
  } = props;
  return (
    <div className={styles.fixNomarInputStyle}>
      <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
        <InputItem
          {...otherProps}
          type={inputType}
          style={{ width: imgExtra ? '86%' : '100%', textAlign: 'right', ...coverStyle }}
        >
          {required && <span className={styles.redStar}>*</span>}
          {title}
        </InputItem>
      </Field>
      {imgExtra && <img src={imgExtra} onClick={imgExtraClick} className={styles.imgExtra} />}
    </div>
  );
};

export default NomarInput;
