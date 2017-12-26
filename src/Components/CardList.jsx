import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CardItem from './CardItem';

import ReactList from 'react-list';
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
class CardList extends Component{
  renderItem(index, key) {
    let {onUserClick}=this.props;
      let item=this.props.data[index];
      return <CardItem
            key={item.id}
            data={item} 
            onUserClick={onUserClick} />;
    }
  itemSizeGetter(index){
    let item=this.props.data[index];
    let height=565+15;
    if(item.type=='article')height=300+15;
    return height
  }
  onScroll(e){
    let obj=e.target;
    let bottom=obj.scrollHeight-obj.scrollTop-obj.clientHeight;
    let {isLoad,onNext,currPage}=this.props;
    if(bottom<30 && !isLoad){
      onNext(currPage+1)
    }
  }
  render(){
    let {pushAct,data,classes,isLoad}=this.props;
    return (
      <Full>
        <div className={classes.scroll} onScroll={::this.onScroll}>
        {data.length>0 &&  <ReactList
            threshold={100}
            itemRenderer={::this.renderItem}
            itemSizeGetter={::this.itemSizeGetter}
            length={data.length}
            type='variable'
          />
        }
        </div>
        {isLoad && <LinearProgress color="accent" className={classes.listLoad} /> }
      </Full>
      )
  }
}

export default withStyles(styles)(CardList);