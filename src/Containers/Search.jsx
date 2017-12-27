import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Full from '../Components/Full';
import {withStyles} from 'material-ui/styles';
import SearchForm from './SearchForm';

const styles=theme=>({
	
})

class Search extends Component{
	render(){
		return (
		<div>
			<AppBar position="absolute" color="default" elevation={1} >
				<Toolbar>
					<SearchForm />
				</Toolbar>
			</AppBar>
		</div>)
	}
}

export default withStyles(styles)(Search)