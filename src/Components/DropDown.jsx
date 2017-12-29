import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Full from './Full';
const styles =theme=>({
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
  },
  foot:{
    textAlign:'center',
    marginTop:10,
    marginBottom:20,
    color:theme.palette.text.disabled,
    fontSize:12,
  }
});
class List extends Component{
  componentDidMount(){
    let {onScroll}=this.props;
    if(onScroll){onScroll(null,0)};
  }
  onScroll(e){
    let obj=e.target;
    let bottom=obj.scrollHeight-obj.scrollTop-obj.clientHeight;
    let {isLoad,onNext,currPage,isEnd,onScroll}=this.props;
    if(onScroll){onScroll(e,obj.scrollTop)};

    if(bottom<30 && !isLoad && !isEnd){
      onNext(currPage+1)
    }
  }
  render(){
    let {classes,isLoad,isEnd}=this.props;
    return (
      <Full>
        <div className={classes.scroll} onScroll={::this.onScroll}>
          {this.props.children}
          {isEnd && <div className={classes.foot}>没有更多了~</div>}
        </div>
        {isLoad && <LinearProgress  className={classes.listLoad} /> }
        
      </Full>
      )
  }
}

export default withStyles(styles)(List);