import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageLoading from '../Components/PageLoading';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Loadable from 'react-loadable';
import {Route,Redirect,withRouter} from 'react-router-dom';
import Nav from './Nav';
import Full from '../Components/Full';
const LoadableHome=Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './Home'),
  loading:PageLoading
});

const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User'),
  loading:PageLoading
});

const LoadableSearch = Loadable({
  loader: () => import(/* webpackChunkName: 'Search' */ './Search'),
  loading:PageLoading
});

const LoadableLike = Loadable({
  loader: () => import(/* webpackChunkName: 'Like' */ './Like'),
  loading:PageLoading
});

class Tab extends Component{
	render(){
		return (
			<Full>
				<Route exact path="/" component={LoadableHome}/>
				<Route path="/tab/home" component={LoadableHome}/>
				<Route exact path="/tab/user" component={LoadableUser}/>
				<Route path="/tab/search" component={LoadableSearch}/>
				<Route path="/tab/like" component={LoadableLike}/>
				<Nav />
			</Full>
			)
		}
}

export default Tab


