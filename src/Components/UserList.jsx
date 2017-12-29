import React,{Component} from 'react';
import CardItem from './CardItem';
import ReactList from 'react-list';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FavoriteIcon from 'material-ui-icons/Favorite';

const styles = theme => ({
  root: {
    width: '100%',
    height:'100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItem:{
    backgroundColor: theme.palette.background.paper,
  }
});


class CheckboxListSecondary extends Component{
  renderItem(index, key) {
    let {onUserClick,listTop,classes}=this.props;
      let item=this.props.data[index];
      let isOwn=false;
      return <div key={item.id} style={{paddingTop:index==0?listTop:0}}>

                <ListItem dense button className={classes.listItem} onClick={(e)=>onUserClick(e,item)}>
                  <Avatar alt="Remy Sharp" src="http://www.qqzhuangban.com/uploadfile/2015/01/1/20150109054231231.jpg" />
                  <ListItemText primary={`Line item ${index + 1}`} />
                  <ListItemSecondaryAction>
                    {isOwn?(
                      <IconButton aria-label="Comments">
                        <DeleteIcon />
                      </IconButton>
                      ):(
                      <IconButton aria-label="Comments">
                        <FavoriteIcon />
                      </IconButton>
                     
                    )}
                  </ListItemSecondaryAction>
                </ListItem>

              </div>;
    }
  itemSizeGetter(index){
    let bottom=0;
    let top=0;
    if(index==0){
      top=this.props.listTop;//头部距离
    }
    let height=56;
    return height+bottom+top
  }
  render(){
    let {data,classes}=this.props;
    if(!data || data.length<=0)return false;
    return <ReactList
              threshold={500}
              itemRenderer={::this.renderItem}
              itemSizeGetter={::this.itemSizeGetter}
              length={data.length}
              type='variable'
              clsasName="taaa"
            />
  }
}

export default withStyles(styles)(CheckboxListSecondary);