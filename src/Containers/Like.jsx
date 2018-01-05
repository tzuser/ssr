import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar,Toolbar,Typography} from 'material-ui';
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
  appbar:{}
});
class Link extends Component{
  
  render(){
    let {classes}=this.props;
    return (
    <Full>
         <AppBar position="absolute" color="default" elevation={1} >
          <Toolbar>
            <Typography type="title" color="inherit">
              关注
            </Typography>
          </Toolbar>
        </AppBar>
        <Content className={classes.content}>
          正在开发中...
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