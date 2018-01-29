import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import {IMG_URL} from '../actions/public';

const styles = theme => ({
  subsidiary:{
    paddingTop:15,
    height:15,
  },
  card: {
    
  },
  media: {
    height: 194,
    width:"100%"
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  title:{
    height:25,
    boxSizing:'border-box',
    overflow: 'hidden'
  },
  caption:{
    '& img':{
      width:"100%"
    },
    '& blockquote':{
      borderLeft: 'solid 2px #cccccc',
      margin: '10px 0px 10px 10px',
      paddingLeft: 5
    },
    '& figure':{
      margin: '10px 0px 10px 10px',
    }

    
  }
});

class PhotoItem extends React.Component {
  getHeight(doc){
    return (doc.cover.height/doc.cover.width)*370
  }

  render() {
    const { classes,data } = this.props;
    return (
      <div>
        <div className={classes.subsidiary}>
        </div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              data.user_avatar?
              <Avatar aria-label={data.user_name.substr(0,1)} src={`${IMG_URL}${data.user_avatar}`} className={classes.avatar} />:
              <Avatar className={classes.avatar} >{data.user_name.substr(0,1)}</Avatar>
            }
            title={data.user_name}
            subheader={data.date}
          />
          <CardMedia
             className={classes.media}
             image={`${IMG_URL}${data.cover.url}`}
             title={data.title} 
             style={{height:this.getHeight(data)}}
             onClick={(e)=>this.props.onCoverClick(e,data)}
           />
          <CardContent>
            <Typography type="headline" component="h2">{data.title}</Typography>
            <Typography component="h3">{data.summary}</Typography>
            {data.caption && <Typography component="div">
              <div 
              className={classes.caption} 
              dangerouslySetInnerHTML={{__html:data.caption}}>
              </div>
            </Typography>}
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <div className={classes.flexGrow} />
          </CardActions>
        </Card>

      </div>
    );
  }
}

PhotoItem.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PhotoItem);