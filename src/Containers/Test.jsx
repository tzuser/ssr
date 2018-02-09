import React from 'react';
import {Route,Redirect,withRouter,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {push} from 'react-router-redux';


class App extends React.Component{
	render(){
		return(
			<div>
				测试
			</div>
			)
	}
};

export default App;