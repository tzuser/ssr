import React from 'react';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import ShowSwitch from './ShowSwitch';
const styles=theme=>({
  root:{
    position:'fixed',
    zIndex:200,
    fontSize: '14px',
    top: '80px',
    textAlign: 'center',
    left:0,
    right:0,
    '&>span':{
      background: theme.palette.primary.main,
      color: '#fff',
      borderRadius: '6px',
      padding: '8px 20px',
    }
  },

})

const UpdateReminding=({classes,show})=>{
  return (
    <ShowSwitch direction="top" targetLoca={40}  isSpace={false} render={({rootClass,rootStyle})=>(
      <div className={classNames(rootClass,classes.root)} style={rootStyle}>
        <span>新的帖子</span>
      </div>
    )}/>
  )
};
export default withStyles(styles)(UpdateReminding);