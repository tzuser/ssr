import React,{Component} from "react";
import {TextField} from 'material-ui';
export const AccountField=(field)=>{
	return (
	<div>
		<TextField
			{...field.input}
			label={field.label}
			fullWidth={field.fullWidth}
			InputProps={field.InputProps}
			placeholder={field.placeholder}
			margin={field.margin}
			type="text"
		/>
		<span  {...field.errorProps}>{field.meta.error}</span>
	</div>
	)
}

export const PasswordField=(field)=>{
	return (
	<div>
		<TextField
			{...field.input}
			label={field.label}
			fullWidth={field.fullWidth}
			InputProps={field.InputProps}
			placeholder={field.placeholder}
			margin={field.margin}
			type="password"
		/>
		<span {...field.errorProps}>{field.meta.error}</span>
	</div>
	)
}