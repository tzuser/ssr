 import React,{Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
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
import ClearIcon from 'material-ui-icons/Clear';
import PhotoCamera from 'material-ui-icons/PhotoCamera';
import {DB_URL} from '../actions/public';
import classNames from 'classnames';
import Avatar from 'material-ui/Avatar';

import Paper from 'material-ui/Paper';
import * as selfAct from '../actions/selfUser';

import TextField from 'material-ui/TextField';

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
    userContent:{
      position:'relative',
    },
    userHeader:{
      maxHeight:200,
      overflow:'hidden'
    },
    userAvatar: {
      width: 80,
      height: 80,
      position:'absolute',
      left:20,
      marginTop:'-40px',
      border:"3px solid #fff",
      boxSizing: 'border-box'
    },
    upAvatar:{
      left:40,
      top:-20,
      zIndex:90,
    },
    upBase:{
      width:40,
      height:40,
      position:'absolute',
      boxShadow:'none',
      backgroundColor:'rgba(0,0,0,0.3)',
      '&:focus,&:active':{
        boxShadow:'none',
        backgroundColor:'rgba(0,0,0,0.3)',
      }
    },
    upPhoto:{
      right:30,
      top:-60,
    },
    userInfo:{
    '& h2':{
      margin: '20px 0 0px 0'
    },
    padding:'20px'
    },
    description:{
      marginBottom: '10px'
    },
    flex: {
      flex: 1,
    },
    userCard:{
      minHeight:800
    }
});

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
class SelfSite extends Component{
  
  componentDidMount(){
    this.props.getSelfInfoAct(this.props.selfUser.name)
  }
  render(){
    let {classes,router,selfUser}=this.props;
    return (
    <Page>
      <HyalineHeader space={150} render={({rootCSS,secondaryCSS,hyaline})=>(
        <ShowSwitch direction="top"  isSpace={false} isHold={true}  render={({rootClass,rootStyle})=>(
          <AppBar position="fixed"  elevation={hyaline?0:4} color={hyaline?"primary":"default"} style={rootStyle} className={classNames(rootCSS,rootClass)} >
            <Toolbar>
               <IconButton color="inherit" aria-label="Menu" onClick={()=>{
              
                  this.props.history.goBack()
      
               }}>
                 <ClearIcon />
               </IconButton>
              <Typography type="title" color="inherit" className={classes.flex} >
                修改个人资料
              </Typography>
              <Button color="inherit">保存</Button>
            </Toolbar>

          </AppBar>
          )}/>
         
      )}/>
        <Content>
           <div className={classes.userCard}>
            <div className={classes.userHeader}>
              <img src={`${DB_URL}${selfUser.header_image}`} width="100%"/>
            </div>
            <div className={classes.userContent}>
              <Button variant="fab" color="primary" className={classNames(classes.upBase,classes.upPhoto)} >
                <PhotoCamera />
              </Button>

              <Button variant="fab" color="primary" className={classNames(classes.upBase,classes.upAvatar)} >
                <PhotoCamera />
              </Button>
              <Avatar  className={classes.userAvatar} src={`${DB_URL}${selfUser.avatar_url}`} />
              <div className={classes.userInfo}>
                <h2>{selfUser.name}</h2>
                <TextField fullWidth label="个性宣言" value={selfUser.description} />
              </div>
            </div>

           </div>
        </Content>
    </Page>
    )
  }
}

const mapStateToProps=(state)=>({
  selfUser:state.selfUser
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getSelfInfoAct:selfAct.getSelfInfo
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SelfSite))  ;