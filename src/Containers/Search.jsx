import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Full from '../Components/Full';
import {withStyles} from 'material-ui/styles';
import SearchForm from './SearchForm';
import Content from '../Components/Content';
const styles=theme=>({
	
})

class Search extends Component{
	render(){
		return (
		<Full>
			<AppBar position="absolute" color="default" elevation={1} >
				<Toolbar>
					<SearchForm />
				</Toolbar>
			</AppBar>
			<Content top={true} bottom={true}  >
				正在开发中...
			</Content>
		</Full>)
	}
}

export default withStyles(styles)(Search)