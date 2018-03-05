import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {withStyles} from 'material-ui/styles';
import SearchForm from './SearchForm';
import Content from '../Components/Content';
import ShowSwitch from '../Components/ShowSwitch';
import Page from '../Components/Page';
import UserCard from '../Components/UserCard';
import {getUserAll} from '../actions/users';
import {subscribe,cancelSubscribe} from '../actions/selfUser';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const styles=theme=>({
	cardList:{
		display:'flex',
		flexDirection: 'row',
		flexWrap:'wrap',
		justifyContent:'center',
	}
})

class Search extends Component{
	componentWillMount(){
		this.props.getUserAllAct()
	}

	render(){
		let {classes,userList,subscribeAct,cancelSubscribeAct,subscribe_uid_list}=this.props;
		return (
		<Page>
		<ShowSwitch direction="top" render={({rootClass,rootStyle})=>(
			<AppBar position="fixed" color="default" style={rootStyle} elevation={4} className={rootClass} >
				<Toolbar>
					<SearchForm />
				</Toolbar>
			</AppBar>
		)} />
			<Content >
				<div className={classes.cardList}>
					{userList.rows.map((item,key)=><UserCard 
													data={item.value} 
													key={key}
													isSubscribe={~subscribe_uid_list.indexOf(item.value.name)}
													onSubscribe={(data)=>{
														subscribeAct(data.name)
													}}
													cancelSubscribe={(data)=>{
														cancelSubscribeAct(data.name)
													}}
													/>

						)}
				</div>
			</Content>
		</Page>)
	}
}
const mapStateToProps=(state)=>({
	userList:state.userList,
	subscribe_uid_list:state.selfUser.subscribe_uid_list
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
	getUserAllAct:getUserAll,
	subscribeAct:subscribe,
	cancelSubscribeAct:cancelSubscribe,
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Search))