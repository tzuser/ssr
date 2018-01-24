import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Acts from '../actions/config';
//自动隐藏插件
class AutoHidden extends Component{
	constructor(props){
		super(props)
		this.scrollEventFun=this.scrollEvent.bind(this);
		this.times=null;
		this.pTop=null;
	}
	scrollEvent(e){
		let {showSwitchCloseAct,showSwitchOpenAct,show}=this.props;
		let cTop=document.documentElement.scrollTop+document.body.scrollTop;
		if(this.pTop){
			if(cTop>100 && cTop-this.pTop>5 && show){
				showSwitchCloseAct()
			}else if((cTop<100 || cTop-this.pTop<-5) && !show){
				showSwitchOpenAct()
			}
		}
		this.pTop=cTop;
	}

	componentDidMount(){
		window.addEventListener('scroll',this.scrollEventFun)
	}
	componentWillUnmount(){
		window.removeEventListener('scroll',this.scrollEventFun)
	}
	render(){
		return false;
	}
}
const mapStateToProps=(state)=>({
	show:state.config.show
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
	showSwitchOpenAct:Acts.showSwitchOpen,
	showSwitchCloseAct:Acts.showSwitchClose
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(AutoHidden)