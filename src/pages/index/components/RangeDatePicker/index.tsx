import React, { FC } from 'react';
import { DatePicker, List } from 'antd-mobile';
import moment from 'moment';
import { Field } from 'rc-field-form';
import { INomarDatePickerProps } from '../NomarDatePicker';

import styles from '../../styles/index.less';

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2: string;
}

const RangeDatePicker: FC<IRangeDatePickerProps> = props => {
  const {
    fieldProps,
    fieldProps2,
    required = false,
    modeType = 'date',
    rules = [],
    title,
    ...otherProps
  } = props;

  /**
   * 时间展示类型改变事件
   * @param val 
   */
  const changeDateMode = (val: Date) => {
    let newValue = '';
    switch (modeType) {
      case 'datetime':
        newValue = moment(val).format('MM-DD hh:mm');
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
  }

  return (
    <div className={styles.fixRangeDatePickerStyle}>
      <div className={styles.firstDatePickerStyle}>
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
      </div>
      <div className={styles.line}>——</div>
      <div className={styles.secondDatePickerStyle}>
        <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            mode={modeType}
            format={value => {
              return changeDateMode(value)
            }}
          >
            <List.Item arrow="horizontal"></List.Item>
          </DatePicker>
        </Field>
      </div>
    </div>
  );
};

export default RangeDatePicker;
