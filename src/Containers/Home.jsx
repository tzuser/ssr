import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Full from '../Components/Full';
import Content from '../Components/Content';
import CardList from '../Components/CardList';

const styles =theme=> ({
  root: {
    width: '100%',
  },
  content:{
    background:theme.palette.background.contentFrame
  }
});
const Home=({classes})=>(
<Full>
	   <AppBar position="absolute" color="default" elevation={0} >
      <Toolbar>
        <Typography type="title" color="inherit">
          青风藤
        </Typography>
      </Toolbar>
    </AppBar>
    <Content className={classes.content}>
       <CardList/>
    </Content>
</Full>
)
export default  withStyles(styles)(Home);