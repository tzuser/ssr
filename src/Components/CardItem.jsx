import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import CommentIcon from 'material-ui-icons/Comment';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Badge from './Badge';
import {IMG_URL} from '../actions/public';
const styles = theme => ({
  card: {
    marginBottom:15
  },
  media: {
    height: 375,
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
  article:{
    height: 130,
    wordBreak: 'break-all',
    wordBreak : 'break-word', 
  },
  photo:{
    position:'relative',
  },
  video:{
    position:'relative',
  },
  playIcon:{
    borderRadius:'50%',
    width:60,
    height:60,
    backgroundColor:'rgba(0,0,0,0.5)',
    position:'absolute',
    left:'50%',
    top:'50%',
    marginLeft:'-30px',
    marginTop:'-30px',
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});
//文章
const ArticleCard=({classes,data})=>(
  <CardContent onClick={()=>console.log('aaa')}>
    <div className={classes.article}>
      <Typography type="headline" component="h2">{data.title}</Typography>
      <div dangerouslySetInnerHTML={{__html:data.text.substr(0,80)}}></div>
    </div>
  </CardContent>
)

const VideoCard=({classes,data})=>(
  <div>
    <div className={classes.video}>
      <div className={classes.playIcon}><PlayArrowIcon  color="contrast" style={{ width: 60, height: 60,}}/></div>
      <CardMedia
        className={classes.media}
        image={`${IMG_URL}${data.cover}`}
        title={data.title}
      />
    </div>
    <CardContent>
      <Typography component="p">{data.title}</Typography>
    </CardContent>
  </div>
)

const PhotoCard=({classes,data})=>(
  <div>
    <div className={classes.photo}>
      {data.photos.length > 1 && <Badge value={data.photos.length}/>}
      <CardMedia
        className={classes.media}
        image={`${IMG_URL}${data.cover}`}
        title={data.title}
      />
    </div>
    <CardContent>
      <Typography component="p">{data.title}</Typography>
    </CardContent>
  </div>
)
class CardItem extends React.Component {
  render() {
    const {classes,onUserClick,data,style}= this.props;
    let height=565;
    switch(data.type){
      case "article":
        height=300
      break
    }
    return (
        <Card className={classes.card} elevation={0} style={{height:height,...style}} >
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar} onClick={(e)=>onUserClick(e,data)} >
                 {data.user.username && data.user.username.substr(0,1).toUpperCase()}
              </Avatar>
            }
            title={data.user.nickname || data.user.username}
            subheader={data.publish_date}
          />
          {data.type=="article" && <ArticleCard classes={classes} data={data} />}
          {data.type=="photo" && <PhotoCard classes={classes} data={data} />}
          {data.type=="video" && <VideoCard classes={classes} data={data} />}

          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <CommentIcon />
            </IconButton>
            <div className={classes.flexGrow} />
          </CardActions>
        </Card>
    );
  }
}

CardItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardItem);