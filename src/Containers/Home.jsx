import React,{Component} from 'react';
import PropTypes from 'prop-types';

import {AppBar,Toolbar,Typography,Button,IconButton} from 'material-ui';

import ShowSwitch from '../Components/ShowSwitch';
import {withStyles} from 'material-ui/styles';
import Page from '../Components/Page';
import Content from '../Components/Content';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PhotoItem from '../Components/PhotoItem';
import Tabs, { Tab } from 'material-ui/Tabs';
import HyalineHeader from '../Components/HyalineHeader';
import MenuIcon from 'material-ui-icons/Menu';
import CreateIcon from 'material-ui-icons/Create';
import ReactList from 'react-list';
import * as PostAct from '../actions/post';
import * as PhotoAct from '../actions/photo';
import * as CreationAct from '../actions/creation';

import classNames from 'classnames';
import CreateButton from '../Components/CreateButton';

import NotHave from '../Components/NotHave';
import UpdateReminding from '../Components/UpdateReminding';
const styles =theme=> ({
  root: {
    width: '100%',
  },
  tz:{
    height:'56px',
    backgroundColor:'#666',
  },
  test:{
    position:'sticky',
    zIndex:1,
    top:56,
    left:0,
    right:0,
  },
  userCard:{
    height:400
  },
  editButton:{
     position:'fixed',
     bottom: 72,
     right:16,
     zIndex:100
  }
});


class Home extends Component{

  componentDidMount(){
    if(this.props.docs.length==0){
      this.props.getHomePostsAct()
    }
  }
  renderItem(index, key) {
    let {docs,getHomePostsAct,postLoad,selfUser,openDocPhotoAct,delDocAct,openCreationAct}=this.props
    let doc=docs[index]
    if(index==docs.length-1 && docs.length>10 && !postLoad){
      getHomePostsAct()
    }
    return (
    <PhotoItem 
    selfUser={selfUser}

    key={doc._id} 
    doc={doc} 
    onCoverClick={(e,doc)=>{
      openDocPhotoAct(doc);
    }}
    onDel={(e,doc)=>{
      delDocAct({id:doc._id,rev:doc._rev})
    }}
    onEdit={(e,doc)=>{
      openCreationAct(doc)
    }}
    cancelSubscribe={(e,doc)=>{
      console.log('不再关注')
    }}

    />
    )
  }

  itemSizeEstimator(index, cache){
    return cache[index] || 450
  }
  render(){
    let {classes,docs,theme,openCreationAct}=this.props;
     return (
    <Page>
        <ShowSwitch direction="top" render={({rootClass,rootStyle})=>(
          <AppBar position="fixed" className={rootClass} style={rootStyle} elevation={4}  >
            <Toolbar>
              <Typography variant="title" color="inherit" >
                首页
              </Typography>
            </Toolbar>
          </AppBar>
        )} />
        <CreateButton onClick={()=>{
          openCreationAct()
        }}/>
        <Content>
        {docs.length>0 ? <ReactList
          itemRenderer={::this.renderItem}
          length={docs.length}
          type='variable'
          threshold={500}
          itemSizeEstimator={::this.itemSizeEstimator}
        />:<NotHave title="没有更多了~"/>}
        </Content>
    </Page>
    )
  }
}

const mapStateToProps=(state)=>({
  docs:state.posts.homePosts?state.posts.homePosts.docs:[],
  postLoad:state.loads.homePosts,
  show:state.config.show,
  selfUser:state.selfUser
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getHomePostsAct:PostAct.getHomePosts,
  delDocAct:PostAct.delDoc,
  openDocPhotoAct:PhotoAct.openDocPhoto,
  openCreationAct:CreationAct.openCreation
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));