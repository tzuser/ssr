import React from 'react';
import {Route,Redirect,withRouter,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/PageLoading';
import Full from '../Components/Full';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AlertDialog from '../Components/AlertDialog';
import {PropTypes} from 'prop-types';
import PhotoSwipe from './PhotoSwipe';
const LoadableTab=Loadable({
  loader: () => import(/* webpackChunkName: 'Tab' */ './Tab'),
  loading:PageLoading
});
const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User'),
  loading:PageLoading
});
class App extends React.Component{
	componentWillMount(){
	
	}
	render(){
		let {alertDialog}=this.props;
		return(
			<Full>
				<AlertDialog 
				open={alertDialog.open}
				title={alertDialog.title}
				content={alertDialog.content}
				btns={alertDialog.btns}
				handleClose={(e,item)=>{
					console.log('关闭',item)
				}}
				btnClick={(e,item)=>{
					this.props.dispatch(item.act)
				}} />
				{/*<Route exact path='/' render={()=><Redirect to="/tab/home"/> } />*/}
				<Switch>
				<Route exact path="/user/:uid" component={LoadableUser}/>
				<Route path="/"  component={LoadableTab}/>
				</Switch>
				{/*<Route path="/tab"  component={LoadableTab}/>*/}
				<PhotoSwipe />
			</Full>
			)
	}
};


const mapStateToProps=(state)=>({
	alertDialog:state.dialog
})

export default withRouter(connect(mapStateToProps)(App));