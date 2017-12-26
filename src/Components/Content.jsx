import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
const styles=theme=>({
	content:{
		width:'100%',
		height:'100%',
		boxSizing: 'border-box',
		position:'relative',
		overflowY: 'auto'
	}
})
const Content=({classes,className,children,style,top=true,bottom=true,...oth})=>{
	let height=(top?56:0) + (bottom?56:0)
	return (
		<div {...oth} 
		className={classNames(classes.content,className)} 
		style={
			Object.assign({},{
				marginTop:top?56:0,
				marginBottom:bottom?56:0,
				height:`calc(100% - ${height}px)`
			},style)}>

			{children}
		</div>
)};
export default withStyles(styles)(Content);