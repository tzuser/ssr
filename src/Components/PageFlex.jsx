import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
const styles=theme=>({
	pageFlex:{
		width:'100%',
		height:'100%',
		display:'flex',
		flexDirection: 'column',
		
	}
})
const PageFlex=({classes,children,className})=>(
		<div className={classNames(classes.pageFlex,className)}>
			{children}
		</div>
);
export default withStyles(styles)(PageFlex);