import React from 'react';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames'
const styles=theme=>({
    tag:{
      position: 'absolute',
      right: 5,
      top: 5,
      backgroundColor:'rgba(0,0,0,0.3)',
      borderRadius: '50%',
      textAlign:'center',
      color:'#fff',
      fontFamily:theme.typography.fontFamily
    },
    small:{
        height:25,
        width:25,
        lineHeight:'27px',
        fontSize:9,
    },
    default:{
        right: 10,
        top: 10,
        height:30,
        width:30,
        lineHeight:'30px',
        fontSize:12,
    }
})
const Badge=({classes,value,size='default'})=>(<span className={classNames(classes.tag,classes[size])}>{value}</span>);
export default withStyles(styles)(Badge);

 