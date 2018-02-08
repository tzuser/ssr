import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import {Paper,Button} from 'material-ui';
import Avatar from 'material-ui/Avatar';
const styles=theme=>({
	root:{
		height:240,
		width:'calc(50% - 10px)',
		overflow: 'hidden',
		margin:5,
	},
	header:{
		width:'100%',
	},
	content:{
		position: 'relative',
		textAlign:'center',
		paddingTop:1,
	},
	avatar:{
		left:0,
		top:0,
		width: 60,
		height: 60,
		position:'absolute',
		left:'50%',
		marginTop:'-30px',
		marginLeft:'-30px',
		border:"3px solid #fff",
		boxSizing: 'border-box'
	},
	userInfo:{
	
	 '& h2':{
	   margin: '30px 0 0px 0',
	   fontSize:'16px'
	 },
	},
	description:{
	 marginBottom: '10px',
	 fontSize:'12px'
	}
})
const UserCard=({classes,children,className})=>(
			<Paper className={classes.root} elevation={2}>
				<img 
					src="http://blog.tangzuo.cc:5984/web/files/default_avatar.jpg"
					className={classes.header}
					/>
				<div className={classes.content}>
					<Avatar
					       alt="Adelle Charles"
					       src="http://blog.tangzuo.cc:5984/web/files/default_avatar.jpg"
					       className={classes.avatar}
					     />
					<div className={classes.userInfo}>
					  <h2>tzuser</h2>
					  <div className={classes.description}>青风藤</div>
					  <Button variant="raised"  color="secondary" size="small" onClick={()=>{
					   // this.props.history.push('/self_site');
					  }} >关注</Button>
					</div>
				</div>
			</Paper>
);
export default withStyles(styles)(UserCard);