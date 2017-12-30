import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListActs from '../actions/postList';
import * as photoActs from '../actions/photo';
import {toList} from '../public/tool';
import { createSelector } from 'reselect';
import {push} from 'react-router-redux';
import CardList from '../Components/CardList';
import DropDown from '../Components/DropDown';


class PostList extends Component{
	componentWillMount(){//默认加载第一页
	  let {getListAct,postList}=this.props;
	  if(postList.length==0){
	    let getlist=getListAct(1);
	  }
	}
	render(){
		let {postList,pushAct,getListAct,postPage,postLoad,postIsEnd,listTop,onScroll,
    openPhotoAct}=this.props;
		return <DropDown 
          currPage={postPage}
          onNext={(page)=>{
            getListAct(page)
           }}
           isLoad={postLoad}
           isEnd={postIsEnd}
           onScroll={onScroll}
          >
           <CardList 
           listTop={listTop||0}
           data={postList} 
           onUserClick={(e,item)=>pushAct(`/user/${item.user.id}`)}
           onPhotoClick={(e,item)=>openPhotoAct(item.photos)}
           />
          </DropDown>
	}
}

const getList=createSelector([
  state=>state.postList,
  state=>state.homePostKeys.keys,
  state=>state.userList,
  ],(data,keys,users)=>{
    let postList=toList({data,keys});
    //取用户
    postList.map(item=>{
      item.user=users[item.user_id];
      return item
    })
  return postList
})

const mapStateToProps=(state)=>({
  postList:getList(state),
  postPage:state.homePostKeys.page,
  postIsEnd:state.homePostKeys.isEnd,
  postLoad:state.loads.home_list,

})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getListAct:ListActs.getList,
  pushAct:push,
  openPhotoAct:photoActs.openPhoto,
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PostList);