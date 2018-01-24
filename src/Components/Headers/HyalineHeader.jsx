import React,{Component} from 'react';
import {AppBar,Toolbar,Typography} from 'material-ui';
import ShowSwitch from '../ShowSwitch';
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
  	backgroundColor:'rgba(0,0,0,0.1)',
  },
  default:{

  },

});

//透明的头部组件
class HyalineHeader extends Component{
	constructor(props){
		super(props)
		this.state={
			hyaline:true,
		}
		this.scrollEventFun=this.scrollEvent.bind(this);
	}
	scrollEvent(e){
		let {showSwitchCloseAct,showSwitchOpenAct}=this.props;
		let cTop=document.documentElement.scrollTop+document.body.scrollTop;
		if(cTop>350 && this.state.hyaline){
			this.setState({hyaline:false})
		}else if(cTop<350 && !this.state.hyaline){
			this.setState({hyaline:true})
		}
	}

	componentDidMount(){
		window.addEventListener('scroll',this.scrollEventFun)
	}
	componentWillUnmount(){
		window.removeEventListener('scroll',this.scrollEventFun)
	}
	render(){
		console.log('tztzt')
		return this.props.render();
	}
}


export default withStyles(styles)(HyalineHeader)