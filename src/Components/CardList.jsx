import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import PhotoCard from './PhotoCard';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux'
const styles = {
  root: {
    width: '100%',
  },

};
class CardList extends Component{
  render(){
    let {pushAct}=this.props;
    let list =[
    {user:{name:'tzuser'},date:'4月1日',image:"http://img.jj20.com/up/allimg/1011/11221G31547/1G122131547-1-lp.jpg"},
    {user:{name:'a'},image:"http://img.jj20.com/up/allimg/1011/11211G55G8/1G121155G8-1-lp.jpg"},
    {user:{name:'b'},image:"http://img.jj20.com/up/allimg/1011/11201G44555/1G120144555-1-lp.jpg"},
    {user:{name:'c'},image:"http://img.jj20.com/up/allimg/1011/11261G03133/1G126103133-1-lp.jpg"},]
    return (
      <div>
        {list.map((item,key)=><PhotoCard 
          key={key} 
          image={item.image} 
          user={item.user} 
          date={item.date} 
          onUserClick={()=>{
            pushAct(`/user/${key}`)
          }} />)}

      </div>
      )
  }
}
const mapStateToProps=(state)=>({

})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  pushAct:push
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CardList));