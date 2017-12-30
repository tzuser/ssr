import React,{Component} from 'react';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipe} from 'react-photoswipe';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as photoActs from '../actions/photo';
class PW extends Component{
	render(){
		let {photo,closePhoto}=this.props;
		return <PhotoSwipe isOpen={photo.open} items={photo.items} onClose={()=>{closePhoto()}}/>
	}
}
const mapStateToProps=(state)=>({
	photo:state.photo,
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
	closePhoto:photoActs.closePhoto
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PW)