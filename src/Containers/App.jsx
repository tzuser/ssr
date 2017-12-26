import React from 'react';
import {Route,Redirect,withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/PageLoading';
import Full from '../Components/Full';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AlertDialog from '../Components/AlertDialog';
import {PropTypes} from 'prop-types'
const LoadableTab=Loadable({
  loader: () => import(/* webpackChunkName: 'Tab' */ './Tab'),
  loading:PageLoading
});
const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User'),
  loading:PageLoading
});
class App extends React.Component{
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
				<Route exact path="/"  component={LoadableTab}/>
				<Route path="/tab"  component={LoadableTab}/>
				<Route exact path="/user/:uid" component={LoadableUser}/>
			</Full>
			)
	}
};


const mapStateToProps=(state)=>({
	alertDialog:state.dialog
})

export default withRouter(connect(mapStateToProps)(App));