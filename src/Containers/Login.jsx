import React,{Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Page from '../Components/Page';
const styles=theme=>({
	root:{

	}
})
class Login extends Component{
	render(){

		return <Page>登陆页面</Page>
	}
}
export default withStyles()(Login)