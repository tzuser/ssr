 import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar,Toolbar,Typography} from 'material-ui';
import ShowSwitch from '../Components/ShowSwitch';
import {withStyles} from 'material-ui/styles';
import Page from '../Components/Page';
import Content from '../Components/Content';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PhotoItem from '../Components/PhotoItem';
import Tabs, { Tab } from 'material-ui/Tabs';
import HyalineHeader from '../Components/HyalineHeader';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
const styles =theme=> ({
  root: {
    width: '100%',
  },

  appbar:{},
  tz:{
    height:'56px',
    backgroundColor:'#666',
  },
  test:{
    position:'sticky',
    zIndex:1,
    top:56,
    left:0,
    right:0,
  },
  userCard:{
    height:400
  }
});


class Home extends Component{
  render(){
    let {classes}=this.props;
    return (
    <Page>
        <ShowSwitch direction="top">
          <AppBar position="fixed"  elevation={4}  >
            <Toolbar>
              <Typography type="title" color="inherit" >
                首页
              </Typography>
            </Toolbar>
          </AppBar>
        </ShowSwitch>
        <Content>
          {[1,2,3,4,5,6,7,8,9,10].map(item=><PhotoItem key={item} />)}
        </Content>
    </Page>
    )
  }
}

const mapStateToProps=(state)=>({

})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home))  ;