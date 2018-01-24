import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageLoading from '../Components/PageLoading';
import Page from '../Components/Page';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Loadable from 'react-loadable';
import {Route,Redirect,withRouter} from 'react-router-dom';
import Nav from './Nav';

const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User'),
  loading:PageLoading
});

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './Home'),
  loading:PageLoading
});

const LoadableFind = Loadable({
  loader: () => import(/* webpackChunkName: 'Find' */ './Find'),
  loading:PageLoading
});

const LoadableNotice = Loadable({
  loader: () => import(/* webpackChunkName: 'Notice' */ './Notice'),
  loading:PageLoading
});

class Tab extends Component{
	render(){
		return (
			<Page>
				<Route exact path="/" component={LoadableHome}/>
				<Route path="/home" component={LoadableHome}/>
				<Route exact path="/user" component={LoadableUser}/>
				<Route path="/find" component={LoadableFind}/>
				<Route path="/notice" component={LoadableNotice}/>
				<Nav />
			</Page>
			)
		}
}
export default Tab


