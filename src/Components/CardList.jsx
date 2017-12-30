import React,{Component} from 'react';
import CardItem from './CardItem';
import ReactList from 'react-list';

class List extends Component{
  renderItem(index, key) {
    let {onUserClick,listTop,onPhotoClick}=this.props;
      let item=this.props.data[index];
      return <div key={item.id} style={{paddingTop:index==0?listTop:0}}>
                <CardItem
                  data={item}
                  onUserClick={onUserClick}
                  onPhotoClick={onPhotoClick} />
                  
              </div>;
    }
  itemSizeGetter(index){
    let bottom=15;
    let top=0;
    if(index==0){
      top=this.props.listTop;//头部距离
    }
    let height=565;
    let item=this.props.data[index];
    if(item.type=='article')height=300;
    return height+bottom+top
  }
  render(){
    let {data}=this.props;
    if(data.length<=0)return false;
    return <ReactList
            threshold={500}
            itemRenderer={::this.renderItem}
            itemSizeGetter={::this.itemSizeGetter}
            length={data.length}
            type='variable'
          />
  }
}

export default List;