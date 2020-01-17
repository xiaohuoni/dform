import React, { FC } from 'react';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import { Field } from 'rc-field-form';
import { DatePicker, List } from 'antd-mobile';
import moment from 'moment';

import styles from '../../styles/index.less';

export interface INomarDatePickerProps extends DatePickerPropsType {
  modeType?: DatePickerPropsType['mode'];
  fieldProps: string;
  required?: boolean;
  title: string;
  rules?: [];
  placeholder?: string;
}

const NomarDatePicker: FC<INomarDatePickerProps> = props => {
  const { fieldProps, required = false, title, rules, modeType = 'date', ...otherProps } = props;

  /**
   * 时间展示类型改变事件
   * @param val
   */
  const changeDateMode = (val: Date) => {
    let newValue = '';
    switch (modeType) {
      case 'datetime':
        newValue = moment(val).format('YYYY-MM-DD hh:mm');
        break;
      case 'month':
        newValue = moment(val).format('YYYY-MM');
        break;
      case 'time':
        newValue = moment(val).format('hh:mm');
        break;
      case 'year':
        newValue = moment(val).format('YYYY');
        break;
      default:
        newValue = moment(val).format('YYYY-MM-DD');
        break;
    }
    return newValue;
  };

  return (
    <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
      <DatePicker 
        {...otherProps} 
        mode={modeType}
        format={value => {
          return changeDateMode(value)
        }}
      >
        <List.Item arrow="horizontal">
          {required && <span className={styles.redStar}>*</span>}
          {title}
        </List.Item>
      </DatePicker>
    </Field>
  );
};

export default NomarDatePicker;
