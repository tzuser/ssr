import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Full from './Full';
const styles = {
  scroll:{
    height: '100%',
    overflowY: 'auto',
    position:'relative',
  },
  listLoad:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
  }
};
class List extends Component{
  onScroll(e){
    let obj=e.target;
    let bottom=obj.scrollHeight-obj.scrollTop-obj.clientHeight;
    let {isLoad,onNext,currPage}=this.props;
    if(bottom<30 && !isLoad){
      onNext(currPage+1)
    }
  }
  render(){
    let {classes,isLoad}=this.props;
    return (
      <Full>
        <div className={classes.scroll} onScroll={::this.onScroll}>
          {this.props.children}
        </div>
        {isLoad && <LinearProgress  className={classes.listLoad} /> }
      </Full>
      )
  }
}

export default withStyles(styles)(List);