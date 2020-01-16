import React,{ FC } from 'react';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';

export interface IRangeDatePickerProps extends DatePickerPropsType{
  modeType?: DatePickerPropsType['mode'];
  fieldProps1: string;
  fieldProps2: string;
  required?: boolean;
  title: string;
  rules?: [];
  placeholder?: string;
}

const RangeDatePicker: FC<IRangeDatePickerProps> = props => {
  return (
    <div>1</div>
  )
}

export default RangeDatePicker;
