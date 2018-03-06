import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Full from './Full';
const styles =theme=>({
  root:{
    padding:20,
    textAlign:'center',
    marginTop:10,
    marginBottom:20,
    color:theme.palette.text.disabled,
    fontSize:12,
  },
});
class NotHave extends Component{
  render(){
    let {title,classes}=this.props;
    return (<div className={classes.root}>{title}</div>)
  }
}

export default withStyles(styles)(NotHave);