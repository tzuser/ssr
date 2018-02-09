import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ShowSwitch from './ShowSwitch';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles =theme=> ({
  root:{
    transition: 'top 0.4s ease 0.4s,background 0.4s ease 0s',
  },
  hyalineRoot:{
  	backgroundColor:'rgba(0,0,0,0.2)',
  },
  secondary:{
  	transition: 'all 0.4s ease 0s',
  	opacity:1,
  },
  hyalineSecondary:{
  	opacity:0,
  }

});

//透明的头部组件
class HyalineHeader extends Component{
	constructor(props){
		super(props)
		this.state={
			hyaline:this.getTop(),
		}
		this.scrollEventFun=this.scrollEvent.bind(this);
	}
	getTop(){
		try{
		 	return document.documentElement.scrollTop+document.body.scrollTop==0
		}catch(err){
			return true;
		}
	}

	scrollEvent(e){
		let {showSwitchCloseAct,showSwitchOpenAct,space,onHyaline}=this.props;
		let cTop=document.documentElement.scrollTop+document.body.scrollTop;
		if(cTop>space && this.state.hyaline){
			this.setState({hyaline:false})
			if(onHyaline)onHyaline(false);
		}else if(cTop<space && !this.state.hyaline){
			this.setState({hyaline:true})
			if(onHyaline)onHyaline(true);
		}
	}

	componentDidMount(){
		this.setState({hyaline:this.getTop()})
		window.addEventListener('scroll',this.scrollEventFun)
	}
	componentWillUnmount(){
		window.removeEventListener('scroll',this.scrollEventFun)
	}
	render(){
		let {classes}=this.props;
		let {hyaline}=this.state;
		let rootCSS=classNames(classes.root,hyaline?classes.hyalineRoot:'');
		let secondaryCSS=classNames(classes.secondary,hyaline?classes.hyalineSecondary:'');
		return this.props.render({rootCSS,secondaryCSS,hyaline});
	}
}


export default withStyles(styles)(HyalineHeader)