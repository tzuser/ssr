import React,{PureComponent} from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
const styles=theme=>({
	page:{
		height: 'auto',
		minHeight:'100%',
		position: 'relative',
		visibility: 'visible',
		bottom: 0,
	    left: 0,
	    right: 0,
	    top: 0,
	    background:theme.palette.background.contentFrame,
	}
})


class Page extends PureComponent{
	state={
		minHeight:window.innerHeight,
	}

	render(){
		let {classes,children,className}=this.props;
		return (
		<div className={classNames(classes.page,className)} style={{minHeight:this.state.minHeight}}>
			{children}
		</div>)
	}
} 
export default withStyles(styles)(Page);