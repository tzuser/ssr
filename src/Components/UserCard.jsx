import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
const styles=theme=>({
	bigAvatar: {
	    width: 77,
	    height: 77,
	},
	userCard:{
		display:'flex',
		flexDirection:'row',
		margin:16,
	},
	cardRight:{
		marginLeft:28,
		width:'100%',
	},
	cardName:{
		margin:0,
		marginBottom:8,
		fontWeight: 'initial'
	},
	cardButton:{
		border:'1px solid #dbdbdb',
		width:'100%',
	},
})
const UserCard=({classes,isOwn})=>(
    	<div className={classes.userCard} >
	    	<Avatar 
	    	alt="Adelle Charles" 
	    	src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513364537733&di=9e5e989eb282d93eb2880ed13114d9ae&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1703%2F7_170314141520_10.jpg"
	    	className={classes.bigAvatar}  />
	    	<div className={classes.cardRight}>
	    		<h2 className={classes.cardName}>tzuser</h2>
	    		<Button  dense className={classes.cardButton}>
	    			{isOwn?'编辑个人资料':'正在关注'}
	    		</Button>
	    	</div>
    	</div>
);
export default withStyles(styles)(UserCard);