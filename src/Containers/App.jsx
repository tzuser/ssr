import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/PageLoading';
import Full from '../Components/Full';
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
		return(
			<Full>
				{/*<Route exact path='/' render={()=><Redirect to="/tab/home"/> } />*/}
				<Route exact path="/"  component={LoadableTab}/>
				<Route path="/tab"  component={LoadableTab}/>
				<Route exact path="/user/:uid" component={LoadableUser}/>
			</Full>
			)
	}
};

export default App