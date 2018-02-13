 import React,{Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import ShowSwitch from '../../Components/ShowSwitch';
import {withStyles} from 'material-ui/styles';
import Page from '../../Components/Page';
import Content from '../../Components/Content';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PhotoItem from '../../Components/PhotoItem';
import Tabs, { Tab } from 'material-ui/Tabs';
import HyalineHeader from '../../Components/HyalineHeader';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {DB_URL,IMG_URL} from '../../actions/public';
import classNames from 'classnames';
import ReactList from 'react-list';
import * as UsersAct from '../../actions/users';
import * as PostAct from '../../actions/post';
import * as PhotoAct from '../../actions/photo';
import {createSelector} from "reselect" 
const styles =theme=> ({
  root: {
    width:'100%',
  },
  appbar:{},
  tz:{
    height:'56px',
    backgroundColor:'#666666',
  },
  test:{
    position:'sticky',
    zIndex:1,
    top:56,
    left:0,
    right:0,
  },
  userCard:{
    
  },
  userContent:{
    position:'relative',
    textAlign:'center'
  },
  userHeader:{
    maxHeight:230,
    overflow:'hidden'
  },
  userAvatar: {
     width: 80,
     height: 80,
     position:'absolute',
     left:'50%',
     marginTop:'-40px',
     marginLeft:'-40px',
     border:"3px solid #fff",
     boxSizing: 'border-box'
   },
   userInfo:{
   
    '& h2':{
      margin: '20px 0 0px 0'
    },
    padding:'20px 0'
   },
   description:{
    marginBottom: '10px'
   }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const TabCom=(porps)=>(
  <Tabs
    {...porps}
    fullWidth
  >
    <Tab label="帖子" />
    <Tab label="喜欢" />
    <Tab label="关注" />
  </Tabs>
)
class SelfUser extends Component{
  componentWillMount(){
    this.props.getInfoAct(this.props.match.params.name)
  }
  componentDidMount(){
    let {selfUser,docs,getUserPostsAct}=this.props;
    if(docs.length==0){
      getUserPostsAct(selfUser.name)
    }
  }
  renderItem(index, key) {
    let {docs,getUserPostsAct,postLoad,selfUser,openDocPhotoAct,delDocAct,openCreationAct}=this.props
    let doc=docs[index]
    if(index==docs.length-1 && docs.length>10 && !postLoad){
      getUserPostsAct(selfUser.name)
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
    let {classes,router,user,openCreationAct,docs}=this.props;
    if(!user) return <div>加载中</div>;
    return (
    <Page>
      <HyalineHeader space={300} render={({rootCSS,secondaryCSS,hyaline})=>(
        <ShowSwitch direction="top"  isSpace={false}   render={({rootClass,rootStyle})=>(
          <AppBar position="fixed"  elevation={hyaline?0:4} style={rootStyle} className={classNames(rootCSS,rootClass)} >
            <Toolbar>
              <Typography variant="title" color="inherit" className={secondaryCSS}>
                {user.name}
              </Typography>
            </Toolbar>
          </AppBar>
          )}/>
          
      )}/>
        <Content>
          <Paper>
           <div className={classes.userCard}>
            <div className={classes.userHeader}>
            <img src={`${DB_URL}${user.header_image}`} width="100%"/>
            </div>
            <div className={classes.userContent}>
              <Avatar  className={classes.userAvatar} src={`${DB_URL}${user.avatar_url}`} />
              <div className={classes.userInfo}>
                <h2>{user.name}</h2>
                <div className={classes.description}>{user.description}</div>
            
              </div>
            </div>
           </div>
          </Paper>

          <div>文章</div>
          {docs.length>0 && <ReactList
            itemRenderer={::this.renderItem}
            length={docs.length}
            type='variable'
            threshold={500}
            itemSizeEstimator={::this.itemSizeEstimator}
          />}
          <div style={{height:30}}></div>
        </Content>
    </Page>
    )
  }
}

const getUserPosts=createSelector([
  state=>state.userPosts,
  (state,props)=>props.match.params.name
  ],(list,name)=>{
    if(list[name]){
      return list[name].docs
    }
    return []
})

const getUser=createSelector([
  state=>state.users,
  (state,props)=>props.match.params.name
  ],(list,name)=>{
    return list[name]
})

const mapStateToProps=(state,props)=>({
  docs:getUserPosts(state,props),
  user:getUser(state,props),
  postLoad:state.loads.homePosts,
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getUserPostsAct:PostAct.getUserPosts,
  delDocAct:PostAct.delDoc,
  openDocPhotoAct:PhotoAct.openDocPhoto,
  getInfoAct:UsersAct.getInfo
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SelfUser))  ;
