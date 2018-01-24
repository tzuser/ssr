import React,{Component} from 'react';
import { CircularProgress } from 'material-ui/Progress';
import AppBar from 'material-ui/AppBar';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const styles=theme=>({
	showSwitch:{
		transition: 'top 0.4s ease 0.4s,bottom 0.4s ease 0.4s',
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
	render(){
		/*
		direction left top right bottom,
		isSpace 保留位置,
		isHold 是否停留,
		isAnimation 是否播放动画
		*/
		let {children,classes,show=true,direction,retain=-10,isHold=false,isSpace=true,isAnimation=true}=this.props;
		let {height}=this.state;
		let style=isSpace?{height:height,width:'100%'}:{};
		let space=isHold?0:(show?0:-(height-retain));
		return <div ref="showSwitch" style={style}  >
			{React.cloneElement(children,
			{
				...children.props, 
				style:{
					...children.props.style,
					[direction]:space,
				} , 
				className:classNames(children.props.className,classes.showSwitch)
			}
		)}
		</div>
	}
}

const mapStateToProps=(state)=>({
	show:state.config.show
})

export default connect(mapStateToProps)(withStyles(styles)(ShowSwitch));