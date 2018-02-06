import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {withStyles} from 'material-ui/styles';
import SearchForm from './SearchForm';
import Content from '../Components/Content';
import ShowSwitch from '../Components/ShowSwitch';
import Page from '../Components/Page';
import UserCard from '../Components/UserCard';
const styles=theme=>({
	cardList:{
		display:'flex',
		flexDirection: 'row',
		flexWrap:'wrap',
		justifyContent:'center',
	}
})

class Search extends Component{

	render(){
		let {classes}=this.props;
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
					{[1,2,3,4,5,6,7,8].map((item,key)=><UserCard key={key} />)}
				</div>
			</Content>
		</Page>)
	}
}

export default withStyles(styles)(Search)