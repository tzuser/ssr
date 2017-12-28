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
import GridList from '../Components/GridList';
import Typography from 'material-ui/Typography';
import UserList from '../Components/UserList';
import UserCard from '../Components/UserCard';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui-icons/ArrowBack';

import PostList from './PostList'

const styles = {
	top:{
		position:'absolute',
		left:0,
		right:0,
		top:0,
		zIndex:99	
	},
  tabPaper:{

  },
  tabCon:{
  	height:"100%",
  	width:'100%',
  	overflow: 'hidden'
  },
  tab:{
  	flexShrink:0,
  },
};

function TabContainer({ children, dir ,className}) {
  return (
    <Typography component="div" dir={dir} className={className} >
      {children}
    </Typography>
  );
}

class User extends Component{
	state={
		active:0,
	}
	render(){
		console.log(this.props)
		let {classes,theme,match:{params:{uid}},history:{goBack,push}}=this.props;
		
		let {deviation}=this.state;
		let isOwn=!!!uid;
		return (
			<Full>
				{!isOwn && <AppBar position="absolute" color="default" elevation={0} >
			      <Toolbar>
			      	<IconButton color="default" onClick={() => goBack()} >
			            <BackIcon />
			        </IconButton>
			        <Typography type="title" color="inherit">
			          个人主页
			        </Typography>
			      </Toolbar>
				</AppBar>}
			    <Content top={!isOwn} bottom={isOwn}  >
			    		<Paper className={classes.top} elevation={1} >
					    	<UserCard isOwn={isOwn} />
					    	<Paper className={classNames(classes.tabPaper,classes.tab)} elevation={0}>
						    	<Tabs
						          value={this.state.active}
						          onChange={(e,value) => {this.setState({active:value})}}
						          indicatorColor="primary"
						          textColor="primary"
						          centered
						          fullWidth >
						          <Tab label="帖子" />
						          <Tab label="关注者" />
						          <Tab label="正在关注" />
						        </Tabs>
					        </Paper>
				        </Paper >

				        <div className={classes.tabCon}>
				        	{this.state.active === 0 && <PostList listTop={157} />}
				        	{this.state.active === 1 && 
				        		<TabContainer dir={theme.direction}> 
				        			<UserList isOwn={isOwn} onUserClick={(item)=>{push(`/user/${item}`)}} />
				        		</TabContainer>}
				        	{this.state.active === 2 && 
				        		<TabContainer dir={theme.direction}> 
				        			<UserList isOwn={isOwn} />
				        		</TabContainer>}
				        </div>
			    </Content>
			</Full>
			)
	}
}

export default withStyles(styles, { withTheme: true })(User);