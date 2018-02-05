import React,{Component} from 'react';
const User=({match:{params:{name}},selfUser:{}})=>{

}

const mapStateToProps=(state)=>{
  return {
    selfUser:state.selfUser
  }
}

export default connect(mapStateToProps)(User)  ;