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


class User extends Component{
  render(){
    let {classes,router}=this.props;
    return (
    <Page>
      <HyalineHeader space={350} render={({rootCSS,secondaryCSS,hyaline})=>(
        <ShowSwitch direction="top" isSpace={false} >
          <AppBar position="fixed"  elevation={hyaline?0:4} className={rootCSS} >
            <Toolbar>
               <IconButton color="inherit" aria-label="Menu" onClick={()=>{
               	this.props.history.push('/home')
               }}>
                 <MenuIcon />
               </IconButton>
              <Typography type="title" color="inherit" className={secondaryCSS}>
                青风藤
              </Typography>
            </Toolbar>
          </AppBar>
        </ShowSwitch>
      )}/>
        <div className={classes.userCard}><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2249199367,4183178846&fm=27&gp=0.jpg" width="100%"/></div>
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


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(User))  ;