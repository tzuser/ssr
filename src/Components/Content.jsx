import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
const styles=theme=>({
	root:{
		position:'relative'
	}
})
const Content=({className='',classes,children,...oth})=>{
	return (
		<div {...oth} className={classNames(className,classes.root)}>
			{children}
		</div>
)};
export default withStyles(styles)(Content);