import React,{Component} from 'react';
import { CircularProgress } from 'material-ui/Progress';
import AppBar from 'material-ui/AppBar';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const styles=theme=>({
	showSwitch:{
		transition: 'top 0.4s ease 0.4s,bottom 0.4s ease 0.4s,visibility 0s ease 0.8s',
	},
})
class ShowSwitch extends Component{
	state={height:0}
	componentDidMount(){
		let height=this.refs.showSwitch.firstChild.clientHeight;
	
		if(height!=this.state.height){
			this.setState({height})
		}
	}
	componentDidUpdate(){
		let height=this.refs.showSwitch.firstChild.clientHeight;
		if(height!=this.state.height){
			this.setState({height})
		}
	}
	render(){
		let {classes}=this.props;
		let {hyaline}=this.state;
		let rootCSS=classNames(classes.root,hyaline?classes.hyalineRoot:'');
		let secondaryCSS=classNames(classes.secondary,hyaline?classes.hyalineSecondary:'');
		return 
	}
	render(){
		/*
		direction left top right bottom,
		isSpace 保留位置,
		isHold 是否停留,
		isAnimation 是否播放动画
		*/
		let {children,classes,show=true,direction,retain=-10,targetLoca=0,isHold=false,isSpace=true,isAnimation=true}=this.props;
		let {height}=this.state;
		let rootClass=classes.showSwitch;
		let style=isSpace?{height:height,width:'100%'}:{};

		let space;
		if(direction=="visibility"){
			space=show?'visible':'hidden';
		}else{
			space=isHold?targetLoca:(show?targetLoca:-(height-retain));
		}
		return <div ref="showSwitch" style={style}  >
			{this.props.render({rootClass,rootStyle:{[direction]:space,show}})}
		</div>
	}
}

const mapStateToProps=(state)=>({
	show:state.config.show
})

export default connect(mapStateToProps)(withStyles(styles)(ShowSwitch));