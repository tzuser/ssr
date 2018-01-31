import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as postAct from '../actions/post';

import {
  IconButton,
  Avatar,
  Typography,
  Toolbar,
  AppBar,
  Divider,
  Dialog,
  Button,
  CircularProgress
} from 'material-ui';

import CloseIcon from 'material-ui-icons/Close';
import HighlightOff from 'material-ui-icons/HighlightOff';
import PhotoCamera from 'material-ui-icons/PhotoCamera';
import Slide from 'material-ui/transitions/Slide';
import CloseButton from '../Components/CloseButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DB_URL} from '../actions/public';
import classNames from 'classnames';
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  box:{
    overflowY: 'overlay',
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
     flexDirection: 'column',
  },
  content:{
    display:'flex',
    flex: 1,
    boxOrdinalGroup: 1,
    order: 1,
    overflow: 'hidden',
    flexDirection: 'column',
    boxOrient: 'vertical',

  },

  textarea:{
     flexGrow: 1,
    border:0,
    minHeight:54,
    height: '100%',
    resize:'none',
    margin:"0 20px ",
    outline: 'none',
  },
  photoInput:{
    display: 'none',
  },
  foot:{
  /*  position: 'absolute',
    bottom: 0,
    left:0,
    right:0,*/
  },
  buttonGroup:{

  },
  other:{
    flexShrink: 0,
    flexGrow: 0,
    display:'flex',
    overflowX: 'scroll',
    padding:'10px 10px',
    '& img':{
      height:200,
    }
  },
  img:{
    position:'relative',
    display: 'inline-block',
    marginRight:8,
    minHeight:200,
  },
  load:{
    minWidth:120,
    backgroundColor:'#f5f5f5',
  },
  progress:{
    position:'absolute',
    left:'50%',
    top:'50%',
    marginLeft:-20,
    marginTop:-20,
  },
  closeButton:{
    position:'absolute',
    right:5,
    top:5,
  },
  user:{
    padding:'10px 20px',
    display: 'flex',
    lineHeight:'40px',
    flexShrink: 0,
    flexGrow: 0,
  },
  userAvatar:{
    marginRight:8
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  upImgs(e){
    let files=e.target.files;
    this.props.upFileAct(files);
  }

  render() {
    const { classes,open,onClose,selfUser,create,delImageAct} = this.props;
    return (
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar} color="default" elevation={0}>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                 
              </Typography>
              <Button color="primary" onClick={onClose} raised>
                发布
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.content}>
            <div className={classes.user}>
              <Avatar  
                className={classes.userAvatar} 
                src={`${DB_URL}${selfUser.avatar_url}`}
              />
              {selfUser.name} 
            </div>
            <div className={classes.box}>
              <textarea 
                placeholder="你最近有什么新鲜事要分享吗?" 
                className={classes.textarea}>
              </textarea>
              <div className={classes.other}>
                {create.images.map((item,key)=>{
                  if(item.isLoad){
                    return (
                      <div key={key} className={classNames(classes.img,classes.load)}>
                        <CircularProgress className={classes.progress} />
                      </div>)
                  }else{
                    return (
                      <div key={key} className={classes.img}>
                        <CloseButton className={classes.closeButton} onClick={(e)=>{
                          delImageAct(item.name);
                        }} />
                        <img src={item.src} />
                      </div>)
                  }
                })}
               {/* <div className={classes.img}>
                  <CloseButton className={classes.closeButton} />
                  <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1517371186&di=dfe7f1c388772da51c7522acba122bf0&src=http://upload.3367.com/2016/0720/1468980000498.jpg" />
                </div>
                <div className={classes.img}>
                  <CloseButton className={classes.closeButton} />
                  <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1517371186&di=dfe7f1c388772da51c7522acba122bf0&src=http://upload.3367.com/2016/0720/1468980000498.jpg" />
                </div>
                <div className={classes.img}>
                  <CloseButton className={classes.closeButton} />
                  <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1517371186&di=dfe7f1c388772da51c7522acba122bf0&src=http://upload.3367.com/2016/0720/1468980000498.jpg" />
                </div>
                <div className={classes.img}>
                  <CloseButton className={classes.closeButton} />
                  <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1517371186&di=dfe7f1c388772da51c7522acba122bf0&src=http://upload.3367.com/2016/0720/1468980000498.jpg" />
                </div>*/}
                
              </div>
            </div>

            <div className={classes.foot}>
              <div className={classes.buttonGroup}>
                    <input
                     accept="image/*"
                     onChange={::this.upImgs}
                     className={classes.photoInput} 
                     id="icon-button-file" 
                     type="file" 
                     multiple />
                    <label htmlFor="icon-button-file">
                      <IconButton className={classes.button} component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
              </div>
            </div>
          </div>
        </Dialog>
    );
  }
}


const mapStateToProps=(state)=>({
  selfUser:state.selfUser,
  create:state.create,
})

const mapDispatchToProps=(dispatch)=>bindActionCreators({
  //getSelfInfoAct:selfAct.getSelfInfo
  upFileAct:postAct.upFile,
  delImageAct:postAct.delImage
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(FullScreenDialog))  ;

