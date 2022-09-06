import React from 'react';
import {Field,ErrorMessage} from 'formik';
import ErrorHighLight from './ErrorHighLight';

const Select = (props) => {

    const { label, name, options, ...rest } = props;
  
    return (
      <div className="form-control">
  
        <label htmlFor={name}>{label}</label>
  
        <Field name={name} as="select" id={name} {...rest}>
          {options.map((optn) => {
            return (
              <option key={optn.value} value={optn.value}>
                {optn.key}
              </option>
            );
          })}
        </Field>
         <ErrorMessage component={ErrorHighLight} name={name}/> 
      </div>
    );
  };
  
  export default Select;