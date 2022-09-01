import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorHighLight from "./ErrorHighLight";

const RadioButton = ({ name, options, label, ...rest }) => {
  return (
    <div className="form-control" style={{display:'flex'}}>
      <label>{label} :</label>
      <Field name={name}>
        {({ field }) => {
          return options.map(({ key, value }) => {
            return (
              <React.Fragment key={key}>
                <input
                  id={value}
                  {...field}
                  type="radio"
                  value={value}
                  checked={field.value === value}
                  {...rest}
                />
                <label htmlFor={value}>{key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorHighLight} />
    </div>
  );
};

export default RadioButton;
