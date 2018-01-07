import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Full from '../Components/Full';
import Content from '../Components/Content';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import {AppBar,Toolbar,Paper,Typography,IconButton} from 'material-ui';

import Tabs, { Tab } from 'material-ui/Tabs';

import GridList from '../Components/GridList';
import UserList from './UserList';
import UserCard from '../Components/UserCard';
import BackIcon from 'material-ui-icons/ArrowBack';

import PostList from './PostList';
import {Motion, spring} from 'react-motion';

const styles =theme=>( {
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
  	overflow: 'hidden',
  	backgroundColor: theme.palette.background.contentFrame,
  },
  tab:{
  	flexShrink:0,
  },
});

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
		headTop:0,
	}
	hiddenTop(){

	}
	onScroll(e,value){
		let {headTop}=this.state;
		let top=value;
		if(top>300 && headTop==0){
			this.setState({headTop:-109})
		}else if(top<=300 && headTop!=0){
			this.setState({headTop:0})
		}
	}
	render(){
		let {classes,theme,match:{params:{uid}},history:{goBack,push}}=this.props;
		
		let {deviation,headTop}=this.state;
		let isOwn=!!!uid;
		return (
			<Full>
				{!isOwn && <AppBar position="absolute" color="default" style={{backgroundColor:'#fff'}} elevation={0} >
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
			    <Motion defaultStyle={{top: 0}} style={{top:spring(headTop,{stiffness: 170, damping: 26})}}>
			    		{value=><div className={classes.top} style={value} >
			    			<Paper elevation={1} >
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
					        </Paper>
				        </div >}
				</Motion>

				        <div className={classes.tabCon}>
				        	{this.state.active === 0 && 
				        		<PostList 
				        		listTop={172} 
				        		onScroll={this.onScroll.bind(this)} />}
				        	{this.state.active === 1 && 
				        		<UserList 
				        		isOwn={isOwn} 
				        		listTop={157} 
				        		onScroll={this.onScroll.bind(this)}
				        		/>}
				        		
				        	{this.state.active === 2 && 
				        		<UserList 
				        		isOwn={isOwn} 
				        		listTop={157} 
				        		onUserClick={(item)=>{push(`/user/${item}`)}} 
				        		onScroll={this.onScroll.bind(this)}
				        		/>
				        	}
				        </div>
			    </Content>
			</Full>
			)
	}
}

export default withStyles(styles, { withTheme: true })(User);