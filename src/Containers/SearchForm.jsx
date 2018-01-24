import React from 'react';
import { Field, reduxForm } from 'redux-form';

import SearchIcon from 'material-ui-icons/Search';
import {TextField} from 'material-ui';
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles';

const styles=theme=>({
	search:{
		width:'100%',
		position:'relative',
	},
	searchInput:{
		width:'100%',
		height:28,
		lineHeight:'28px',
		borderRadius:3,
		boxSizing:'border-box',
		margin:0,
		padding:0,
	},
	searchIcon:{
	   position:'absolute',
	   left:10,
	   top:7,
	   width:18,
	   height:18,
	   zIndex:999,
	},
	textFieldRoot: {
	   padding: 0,
	   width:'100%',
	 },
	 textFieldInput: {
	   borderRadius: 4,
	   background: theme.palette.common.white,
	   border: '1px solid #ced4da',
	   fontSize: 16,
	   padding: '5px 12px',
	   paddingLeft:30,
	   width: 'calc(100% - 24px)',
	   transition: theme.transitions.create(['border-color', 'box-shadow']),
	   '&:focus': {
	     borderColor: 'rgba(0,0,0,.3)',
	     
	   },
	 }
})

let SearchFild=({input,classes,...oth})=>(
	<TextField  
	type="search"
	margin="normal"
	className={classes.searchInput}
	InputProps={{
		disableUnderline: true,
		classes: {
			root: classes.textFieldRoot,
			input: classes.textFieldInput,
		},
	}}
	{...input}
	{...oth}
	/>
)

let SearchForm=({classes})=>(
	<form  className={classes.search}>
			<SearchIcon 
			className={classNames(classes.searchIcon)} 
			/>
			<Field name="inputName" component={SearchFild} classes={classes} placeholder="搜索"  />
	</form>
)
SearchForm = reduxForm({
  form: 'search'
})(SearchForm);

export default withStyles(styles)(SearchForm)