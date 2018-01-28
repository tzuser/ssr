 import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar,Toolbar,Typography,Button} from 'material-ui';
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
import {IMG_URL} from '../actions/public';

import Avatar from 'material-ui/Avatar';
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
  },
  userContent:{
    position:'relative',
    textAlign:'center'
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
    paddingTop:10,
    '& h2':{
      margin: '40px 0 0px 0'
    }
   },
   description:{
    marginBottom: '20px'
   }
});


class SelfUser extends Component{
  componentWillMount(){

  }
  render(){
    let {classes,router,selfUser}=this.props;
    return (
    <Page>
      <HyalineHeader space={350} render={({rootCSS,secondaryCSS,hyaline})=>(
        <ShowSwitch direction="top" isSpace={false} >
          <AppBar position="fixed"  elevation={hyaline?0:4} className={rootCSS} >
            <Toolbar>
               <IconButton color="inherit" aria-label="Menu" onClick={()=>{
                this.props.history.push('/home')
               }}>
                 <MenuIcon />
               </IconButton>
              <Typography type="title" color="inherit" className={secondaryCSS}>
                {selfUser.name}
              </Typography>
            </Toolbar>
          </AppBar>
        </ShowSwitch>
      )}/>
        <Content>
         
         <div className={classes.userCard}>
          <img src={`${IMG_URL}${selfUser.header_image}`} width="100%"/>
          <div className={classes.userContent}>
            <Avatar  className={classes.userAvatar} src={`${IMG_URL}${selfUser.avatar_url}`} />
            <div className={classes.userInfo}>
              <h2>{selfUser.name}</h2>
              <div className={classes.description}>{selfUser.description}</div>
              <Button raised color="primary" >编辑个人资料</Button>
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
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SelfUser))  ;