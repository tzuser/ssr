import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Full from '../Components/Full';
import Content from '../Components/Content';
import CardList from '../Components/CardList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListActs from '../actions/postList';
import {toList} from '../public/tool';
import { createSelector } from 'reselect';
import {push} from 'react-router-redux';
const styles =theme=> ({
  root: {
    width: '100%',
  },
  content:{
    background:theme.palette.background.contentFrame
  }
});
class Home extends Component{
  componentWillMount(){
    console.log(this.props)
    let {getListAct,postList}=this.props;
    if(postList.length==0){
      let getlist=getListAct(1);
    }
  }
  render(){
    let {classes,postList,pushAct,getListAct,postPage,postLoad}=this.props;
    return (
    <Full>
         <AppBar position="absolute" color="default" elevation={0} >
          <Toolbar>
            <Typography type="title" color="inherit">
              青风藤
            </Typography>
          </Toolbar>
        </AppBar>
        <Content className={classes.content}>
           <CardList 
           data={postList} 
           onUserClick={(e,item)=>pushAct(`/user/${item.user.id}`)}
           isLoad={postLoad}
           currPage={postPage}
           onNext={(page)=>{
            getListAct(page)
           }}

           />
        </Content>
    </Full>
    )
  }
}

const getList=createSelector([
  state=>state.postList,
  state=>state.homePostKeys.keys,
  state=>state.userList,
  ],(data,keys,users)=>{
    let postList=toList({data,keys});
    postList.map(item=>{
      item.user=users[item.user_id];
      return item
    })
  return postList
})

const mapStateToProps=(state)=>({
  postList:getList(state),
  postPage:state.homePostKeys.page,
  postLoad:state.loads.home_list,

})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getListAct:ListActs.getList,
  pushAct:push
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));