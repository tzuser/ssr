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

import classNames from 'classnames';
import Create from './Create';

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
  state={
    createOpen:false
  }
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
    let {classes,docs,theme,show}=this.props;
     return (
    <Page>
        <ShowSwitch direction="top" render={({rootClass,rootStyle})=>(
          <AppBar position="fixed" className={rootClass} style={rootStyle} elevation={4}  >
            <Toolbar>
              <Typography type="title" color="inherit" >
                首页
              </Typography>
            </Toolbar>
          </AppBar>
        )} />


         <ShowSwitch direction="visibility" isSpace={false} render={({rootClass,rootStyle})=>(
          <div  className={classNames(classes.editButton,rootClass)} style={rootStyle}>
            <Button fab color="secondary" aria-label="edit" onClick={()=>{
              this.setState({createOpen:true})
            }}>
              <CreateIcon/>
            </Button>
          </div>
          )} />

        <Content>
        <Create open={this.state.createOpen} onClose={()=>{
          this.setState({createOpen:false})
        }}/>
        {docs.length>0 && <ReactList
          itemRenderer={::this.renderItem}
          length={docs.length}
          type='variable'
          threshold={500}
          itemSizeEstimator={::this.itemSizeEstimator}
        />}

        <div style={{height:2200}}></div>
        </Content>

    </Page>
    )
  }
}

const mapStateToProps=(state)=>({
  docs:state.homePosts.docs,
  postLoad:state.loads.homePosts,
  show:state.config.show,
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getHomePostsAct:PostAct.getHomePosts,
  openDocPhotoAct:PhotoAct.openDocPhoto,
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home))  ;