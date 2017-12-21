import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
const styles=theme=>({
	full:{
		width:'100%',
		height:'100%',
		overflow:"hidden",
	}
})
const Full=({classes,children,...oth})=>(
		<div {...oth} className={classes.full}>
			{children}
		</div>
);
export default withStyles(styles)(Full);