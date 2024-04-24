// @ts-ignore
import React, { useState } from 'react';
import { DatePicker as AntDatePicker, DatePickerProps as AntdDatePickerProps } from 'antd';

interface DatePickerProps extends AntdDatePickerProps {}

export const DatePicker = ({ ...props }: DatePickerProps) => {
  return <AntDatePicker {...props} />;
};
