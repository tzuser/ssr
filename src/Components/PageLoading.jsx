import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
const styles=theme=>({
	loadPanel:{
		position:'fixed',
		zIndex:'999',
		top:'50%',
		left:'50%',
		marginLeft:-20,
		marginTop:-20,
	},
	progress:{
	}
})
const PageLoading=({classes})=>(
		<div className={classes.loadPanel}>
			<CircularProgress className={classes.progress} style={{ color: grey[800] }} />
		</div>
);
export default withStyles(styles)(PageLoading);