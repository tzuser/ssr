import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Full from '../Components/Full';
import Content from '../Components/Content';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PostList from './PostList';
const styles =theme=> ({
  root: {
    width: '100%',
  },
  content:{
    background:theme.palette.background.contentFrame
  },
  appbar:{}
});
class Home extends Component{
  
  render(){
    let {classes}=this.props;
    return (
    <Full>
         <AppBar position="absolute" color="default" elevation={1} >
          <Toolbar>
            <Typography type="title" color="inherit">
              青风藤
            </Typography>
          </Toolbar>
        </AppBar>
        <Content className={classes.content}>
          <PostList />
        </Content>
    </Full>
    )
  }
}


const mapStateToProps=(state)=>({

})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));