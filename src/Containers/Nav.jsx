import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import {
	Home as HomeIcon,
	Notifications as NotificationsIcon,
	Explore as ExploreIcon,
	Person as PersonIcon,
} from 'material-ui-icons';



import {withStyles} from 'material-ui/styles';
import {grey} from 'material-ui/colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {push,replace} from 'react-router-redux';
import ShowSwitch from '../Components/ShowSwitch';



const styles=theme=>({
	nav:{
		position:'fixed',
		bottom:0,
		left:0,
		right:0,
		order:6,
		zIndex:101,
		boxShadow: `0 0 8px rgba(0,0,0,.5)`,
	}
})

class Nav extends PureComponent{
	onChange(e,value){
		this.props.replaceAct(value)
	}
	render(){
		let {classes,router:{location:{pathname}}}=this.props;
		let mat=pathname.match(/\/\w+/);
		let value=mat?mat[0]:'/';
		if(pathname=='/')value='/home';//如果是更目录
		return (
			<ShowSwitch direction="bottom" >
				<BottomNavigation value={value} onChange={this.onChange.bind(this)} className={classes.nav} >
					<BottomNavigationAction label="首页" value="/home" icon={<HomeIcon />} classes={{selected:classes.selected}} />
					<BottomNavigationAction label="发现" value="/find" icon={<ExploreIcon />} classes={{selected:classes.selected}} />
					<BottomNavigationAction label="消息" value="/notice" icon={<NotificationsIcon />} classes={{selected:classes.selected}} />
					<BottomNavigationAction label="用户" value="/user" icon={<PersonIcon />} classes={{selected:classes.selected}} />
				</BottomNavigation>
			</ShowSwitch>
		)
	}
}

const mapStateToProps=(state)=>({
	router:state.router
})

const mapDispatchToProps=(dispatch)=>{
	return bindActionCreators({
		pushAct:push,
		replaceAct:replace,
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Nav))