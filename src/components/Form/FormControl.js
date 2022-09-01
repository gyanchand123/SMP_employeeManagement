import React from "react";
import DatePicker from "../../utilities/FormFields/DatePicker";
import Input from "../../utilities/FormFields/Input";
import RadioButton from "../../utilities/FormFields/RadioButton";
import TextArea from "../../utilities/FormFields/TextArea";

const FormControl = ({ control, ...rest }) => {

 switch(control) {
    case 'input':  return <Input {...rest}/>
    case 'radio': return <RadioButton {...rest}/>
    case  'date': return <DatePicker {...rest}/>
    case  'textarea' : return <TextArea {...rest}/>
    default: return null;

 }
 
};

export default FormControl;
