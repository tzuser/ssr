import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Full from '../Components/Full';
import Content from '../Components/Content';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui-icons/ArrowBack';
import {Motion, spring} from 'react-motion';

const styles =theme=>( {
	
});

class User extends Component{
	render(){
		
		
		return (
			<Full>
				<AppBar position="fixed" color="default" elevation={4} >
			      <Toolbar>
			      	{/*<IconButton color="default" onClick={() => goBack()} >
			            <BackIcon />
			        </IconButton>*/}
			        <Typography type="title" color="inherit">
			          个人主页
			        </Typography>
			      </Toolbar>
				</AppBar>
			    <Content>
		    			用户       
			    </Content>
			</Full>
			)
	}
}

export default withStyles(styles)(User);