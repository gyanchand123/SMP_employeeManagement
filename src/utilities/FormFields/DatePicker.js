import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorHighLight from "./ErrorHighLight";
import  DateView  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ name, label, ...rest }) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({field, form}) => {
          const { value } = field;
          const { setFieldValue } = form;

          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              withPortal
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorHighLight} />
    </div>
  );
};

export default DatePicker;
