import React,{ FC } from 'react';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import { INomarDatePickerProps } from '../NomarDatePicker';

export interface IRangeDatePickerProps extends INomarDatePickerProps{
  fieldProps2: string;
}

const RangeDatePicker: FC<IRangeDatePickerProps> = props => {

  return (
    <div>1</div>
  )
}

export default RangeDatePicker;
