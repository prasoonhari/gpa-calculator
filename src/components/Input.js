import React from "react";
import "../App.css";
import InputLabel from '@material-ui/core/InputLabel';

const Input = props => {
  //console.log(props.value);
  return (
    <div className ="Form-row">
      <InputLabel for={props.name}>
        {props.title}
      </InputLabel>
      <input
        
        id={props.name}
        name={props.name}
        type={props.inputType}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
