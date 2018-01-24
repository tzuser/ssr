import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {withStyles} from 'material-ui/styles';
import SearchForm from './SearchForm';
import Content from '../Components/Content';
const styles=theme=>({
	
})

class Search extends Component{
	render(){
		return (
		<div>
			<AppBar position="fixed" color="default" elevation={4} >
				<Toolbar>
					<SearchForm />
				</Toolbar>
			</AppBar>
			<Content >
				正在开发中...
			</Content>
		</div>)
	}
}

export default withStyles(styles)(Search)