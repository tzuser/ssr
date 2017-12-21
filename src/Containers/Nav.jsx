import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import FavoriteIcon from 'material-ui-icons/Favorite';
import SearchIcon from 'material-ui-icons/Search';
import PersonIcon from 'material-ui-icons/Person';
import {withStyles} from 'material-ui/styles';
import {grey} from 'material-ui/colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {push,replace} from 'react-router-redux';


const styles=theme=>({
	nav:{
		position:'absolute',
		bottom:0,
		left:0,
		right:0,
		order:6,
		borderTop:'1px solid rgba(0,0,0,.0975)',
		zIndex:101,
	},
	selected:{
		
	}
})

class Nav extends PureComponent{
	onChange(e,value){
		this.props.replaceAct(value)
	}
	render(){
		let {classes,router:{location:{pathname}}}=this.props;
		let mat=pathname.match(/\/tab\/\w+/);
		let value=mat?mat[0]:'/';
		if(pathname=='/')value='/tab/home';//如果是更目录
		return (
			<BottomNavigation value={value} onChange={this.onChange.bind(this)} className={classes.nav} >
				<BottomNavigationButton label="首页" value="/tab/home" icon={<HomeIcon />} classes={{selected:classes.selected}} />
				<BottomNavigationButton label="搜索" value="/tab/search" icon={<SearchIcon />} classes={{selected:classes.selected}} />
				<BottomNavigationButton label="关注" value="/tab/like" icon={<FavoriteIcon />} classes={{selected:classes.selected}} />
				<BottomNavigationButton label="用户" value="/tab/user" icon={<PersonIcon />} classes={{selected:classes.selected}} />
			</BottomNavigation>
		)
	}
}
Nav.propTypes={
	classes:PropTypes.object.isRequired,
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