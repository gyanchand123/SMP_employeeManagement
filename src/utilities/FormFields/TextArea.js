import React from 'react';
import {Field,ErrorMessage} from 'formik';
import ErrorHighLight from './ErrorHighLight';


const TextArea = ({name,label,...rest}) => {

  
  return (
    <div className='form-control'>
        <label htmlFor={name}>{label}</label>   
        <Field name={name} id={name} as='textarea' {...rest} /> 
        <ErrorMessage name={name} component={ErrorHighLight}/>
    </div>
  )
}

export default TextArea