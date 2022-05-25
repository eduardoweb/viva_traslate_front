import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value,error=null, onChange, type, fullWidth, autoFocus, variant, size, margin, placeholder, color} = props;
    return (
        <TextField
			label={label}
			name={name}
            value={value}
			placeholder={placeholder}
            variant={variant}
            fullWidth={fullWidth}
            autoFocus={autoFocus}
			size={size || "medium" }
			margin={margin || "normal"}
			color={color}
            type={type}
            onChange={onChange}
	        {...(error && {error:true,helperText:error})}
        />
    )
}
