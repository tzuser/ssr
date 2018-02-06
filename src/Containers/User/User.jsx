import React,{Component} from 'react';
import {connect} from 'react-redux';
import SelfUser from './SelfUser'
import OtherUser from './OtherUser'
const User=(props)=>{
	let {match:{params:{name}},selfUser}=props;
	if(selfUser.name==name){
		return <SelfUser {...props}/>
	}else{
		return <OtherUser {...props}/>
	}
}

const mapStateToProps=(state)=>{
  return {
    selfUser:state.selfUser
  }
}

export default connect(mapStateToProps)(User)  ;