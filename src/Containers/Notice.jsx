import React,{Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Full from '../Components/Full';
import Content from '../Components/Content';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const styles =theme=> ({
  root: {
    width: '100%',
  },
  content:{
    background:theme.palette.background.contentFrame
  },
  appbar:{},
});
class Link extends Component{
  
  render(){
    let {classes}=this.props;
    return (
    <Full>
         <AppBar position="fixed" color="default" elevation={4} >
          <Toolbar>
            <Typography variant="title" color="inherit">
              消息
            </Typography>
          </Toolbar>
        </AppBar>
        <Content className={classes.content}>  
          正在开发中...
          <Button variant="raised" color="primary">测试</Button>
        </Content>
    </Full>
    )
  }
}


const mapStateToProps=(state)=>({

})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Link));