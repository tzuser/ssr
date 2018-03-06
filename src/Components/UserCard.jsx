import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import {DB_URL} from '../actions/public';
import FollowButton from '../Components/FollowButton'
const styles=theme=>({
	root:{
		height:240,
		width:'calc(50% - 10px)',
		overflow: 'hidden',
		margin:5,
	},
	header:{
		width:'100%',
		height:'100px'
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

const UserCard=({data,classes,children,className,onSubscribe,cancelSubscribe,isSubscribe,onAvatar})=>{

	
	return (
			<Paper className={classes.root} elevation={2}>
				<img 
					src={DB_URL+data.header_image}
					className={classes.header}
					/>
				<div className={classes.content}>
					<Avatar
					       alt="Adelle Charles"
					       src={DB_URL+data.avatar_url}
					       className={classes.avatar}
					       onClick={(e)=>onAvatar(e,data)}
					     />
					<div className={classes.userInfo}>
					  <h2>{data.name}</h2>
					  <div className={classes.description}></div>
					  <FollowButton 
					  onSubscribe={onSubscribe}
					  cancelSubscribe={cancelSubscribe}
					  isSubscribe={isSubscribe}
					  size="small" 
					  data={data}/>
					</div>
				</div>
			</Paper>
)};
export default withStyles(styles)(UserCard);