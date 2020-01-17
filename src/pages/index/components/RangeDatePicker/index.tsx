import React, { FC, useState } from 'react';
import { DatePicker, List } from 'antd-mobile';
import moment from 'moment';
import { Field } from 'rc-field-form';
import { INomarDatePickerProps } from '../NomarDatePicker';

import styles from '../../styles/index.less';

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2: string;
}

const RangeDatePicker: FC<IRangeDatePickerProps> = props => {
  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState();
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
  const changeDateFormat = (val: Date) => {
    let dateFormat = '';
    switch (modeType) {
      case 'datetime':
        dateFormat = moment(val).format('MM-DD hh:mm');
        break;
      case 'month':
        dateFormat = moment(val).format('YYYY-MM');
        break;
      case 'time':
        dateFormat = moment(val).format('hh:mm');
        break;
      case 'year':
        dateFormat = moment(val).format('YYYY');
        break;
      default: 
      dateFormat = moment(val).format('YYYY-MM-DD');
        break;
    }
    return dateFormat;
  }

  return (
    <div className={styles.rangeDatePickerStyle}>
      <div className={styles.beginDatePickerStyle}>
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            value={beginDate}
            mode={modeType}
            maxDate={endDate}
            format={value => {
              return changeDateFormat(value)
            }}
            onChange={e => { setBeginDate(e) }}
          >
            <List.Item arrow="horizontal">
              {required && <span className={styles.redStar}>*</span>}
              {title}
            </List.Item>
          </DatePicker>
        </Field>
      </div>
      <div className={styles.line}>——</div>
      <div className={styles.endDatePickerStyle}>
        <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            mode={modeType}
            minDate={beginDate}
            onChange={e => { setEndDate(e) }}
            format={value => {
              return changeDateFormat(value)
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
