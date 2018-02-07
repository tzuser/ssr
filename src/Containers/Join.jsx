import React,{Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Paper,TextField,Divider,Button,CircularProgress} from 'material-ui';
import Page from '../Components/Page';

import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';


import * as selfAct from '../actions/selfUser';
import {Field, reduxForm,submit  } from 'redux-form';

import {AccountField,PasswordField} from '../Components/Fields';
import { SubmissionError,destroy } from 'redux-form'


const styles=theme=>({
	root:{
		backgroundColor:theme.palette.background.appBar,
		boxSizing: 'border-box'
	},
	content:{
		maxWidth: 300,
		margin:'0 auto',
	},
	title:{
		textAlign: 'center',
		paddingTop:50,
		fontSize:26,
	},
	form:{
		margin:'20px 0',
	},
	textFieldInput:{
	  padding: '11px 10px 11px 13px',
	  display: 'block',
	  border: 'none',
	  background: 'none',
	  boxSizing: 'border-box',
	  height: '45px'
	},
	error:{
		color:theme.palette.error.main,
		width:'100%',
		display:'block',
		padding:'0 10px',
		fontSize:12,
		lineHeight:'20px',
		boxSizing: 'border-box',
	}
})
class Join extends Component{
	componentWillUnMount(){
		destroyAct('join');
	}
	render(){
		let {classes,handleSubmit,loginLoad,joinAct}=this.props;
		return <Page className={classes.root}>
			<div className={classes.content}>
				<form  onSubmit={handleSubmit(joinAct)} >
				<div className={classes.title}>加入我们</div>
				<Paper className={classes.form}>
					<Field 
					name="username"
					component={AccountField}
					fullWidth
					placeholder="账号" 
					errorProps={{
						className:classes.error
					}}
					InputProps={{
					         disableUnderline: true,
					         classes: {
					           input: classes.textFieldInput,
					         },
					       }}
					/>
					  <Divider />
					<Field 
						name="password"
						component={PasswordField}
						placeholder="密码"
						fullWidth
						errorProps={{
							className:classes.error
						}}
						type="password"
						InputProps={{
						         disableUnderline: true,
						         classes: {
						           input: classes.textFieldInput,
						         },
						       }}
					/>
					  <Divider />
					<Field 
						name="confirm"
						component={PasswordField}
						placeholder="确认密码"
						errorProps={{
							className:classes.error
						}}
						type="password"
						fullWidth
						InputProps={{
						         disableUnderline: true,
						         classes: {
						           input: classes.textFieldInput,
						         },
						       }}
					/>

				</Paper>
				<Button 
				fullWidth 
				variant="raised"  
				type="submit"
				color="primary"

				disabled={loginLoad} 
				>
					{loginLoad?<CircularProgress size={24} />:'注册'}
				</Button>
				<Button fullWidth onClick={()=>{
					this.props.history.replace('/login')
				}}>登录</Button>
				</form>
			</div>
		</Page>
	}
}




Join=reduxForm({
	form:'join'
})(Join)

const mapStateToProps=(state)=>{
  return{
    loginLoad:state.loads.join   || false,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({
  	joinAct:selfAct.join,
  	submitAct:submit,
  	destroyAct:destroy
  },dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Join))