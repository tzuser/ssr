 import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar,Toolbar,Typography} from 'material-ui';
import ShowSwitch from '../Components/ShowSwitch';
import {withStyles} from 'material-ui/styles';
import Page from '../Components/Page';
import Content from '../Components/Content';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PhotoItem from '../Components/PhotoItem';
import Tabs, { Tab } from 'material-ui/Tabs';
import HyalineHeader from '../Components/HyalineHeader';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ReactList from 'react-list';

import * as PostAct from '../actions/post';
import * as PhotoAct from '../actions/photo';

const styles =theme=> ({
  root: {
    width: '100%',
  },

  appbar:{},
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
  }
});


class Home extends Component{
  componentDidMount(){
    if(this.props.docs.length==0){
      this.props.getHomePostsAct()
    }
  }
  renderItem(index, key) {
    let {docs,getHomePostsAct,postLoad}=this.props
    let doc=docs[index]
    if(index==docs.length-1 && docs.length>10 && !postLoad){
      getHomePostsAct()
    }
    return (
    <PhotoItem 
    key={doc.id} 
    data={doc} 
    onCoverClick={(e,doc)=>{
      this.props.openDocPhotoAct(doc);
    }}
    />
    )
  }

  itemSizeEstimator(index, cache){
    return cache[index] || 450
  }
  render(){
    let {classes,docs}=this.props;
    return (
    <Page>
        <ShowSwitch direction="top">
          <AppBar position="fixed"  elevation={4}  >
            <Toolbar>
              <Typography type="title" color="inherit" >
                首页
              </Typography>
            </Toolbar>
          </AppBar>
        </ShowSwitch>
        <Content>
        {docs.length>0 && <ReactList
          itemRenderer={::this.renderItem}
          length={docs.length}
          type='variable'
          threshold={500}
          itemSizeEstimator={::this.itemSizeEstimator}
        />}
        </Content>
    </Page>
    )
  }
}

const mapStateToProps=(state)=>({
  docs:state.homePosts.docs,
  postLoad:state.loads.homePosts
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getHomePostsAct:PostAct.getHomePosts,
  openDocPhotoAct:PhotoAct.openDocPhoto,
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home))  ;