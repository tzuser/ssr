import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as creationAct from '../actions/creation';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import {Field, reduxForm,submit  } from 'redux-form';
import CloseIcon from 'material-ui-icons/Close';
import HighlightOff from 'material-ui-icons/HighlightOff';
import PhotoCamera from 'material-ui-icons/PhotoCamera';
import Slide from 'material-ui/transitions/Slide';
import CloseButton from '../Components/CloseButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DB_URL} from '../actions/public';
import classNames from 'classnames';
const styles =theme=>({
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
    color:theme.palette.text.secondary,
  },

  textarea:{
     flexGrow: 1,
    border:0,
    minHeight:54,
    height: '100%',
    resize:'none',
    margin:"0 20px ",
    outline: 'none',
    backgroundColor:theme.palette.background.paper,
    color:theme.palette.text.secondary,
    //color:,
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
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Creation extends React.Component {
  upImgs(e){
    let files=e.target.files;
    this.props.upFileAct(files);
  }

  render() {
    const { classes,open,selfUser,creation,delImageAct,saveCreationAct,closeCreationAct} = this.props;
    return (
        <Dialog
          fullScreen
          open={creation.open}
          onClose={closeCreationAct}
          transition={Transition}
        >
          <AppBar className={classes.appBar} color="default" elevation={0}>
            <Toolbar>
              <IconButton color="inherit" onClick={closeCreationAct} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                 
              </Typography>
              <Button variant="raised" color="primary" onClick={()=>{
                saveCreationAct()
                closeCreationAct()
              }} raised>
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
              <Field 
              component="textarea" 
              name="text" 
              placeholder="你最近有什么新鲜事要分享吗?" 
              className={classes.textarea}
              />

              <div className={classes.other}>
                {creation.images.map((item,key)=>{
                  if(item.isLoad){
                    return (
                      <div key={key} className={classNames(classes.img,classes.load)}>
                        <CircularProgress className={classes.progress} />
                      </div>)
                  }else{
                    return (
                      <div key={key} className={classes.img}>
                        <CloseButton className={classes.closeButton} onClick={(e)=>{
                          delImageAct({name:item.name,src:item.src});
                        }} />
                        <img src={item.src} />
                      </div>)
                  }
                })}
              </div>
            </div>

            <div className={classes.foot}>
              <div className={classes.buttonGroup}>
                    <input
                     accept="image/jpg,image/jpeg,image/png,image/gif"
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

Creation=reduxForm({
  form:'creation'
})(Creation)


const mapStateToProps=(state)=>({
  selfUser:state.selfUser,
  creation:state.creation,

})

const mapDispatchToProps=(dispatch)=>bindActionCreators({
  //getSelfInfoAct:selfAct.getSelfInfo
  upFileAct:creationAct.upFile,
  delImageAct:creationAct.delImage,
  saveCreationAct:creationAct.saveCreation,
  closeCreationAct:creationAct.closeCreation,
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Creation))  ;

