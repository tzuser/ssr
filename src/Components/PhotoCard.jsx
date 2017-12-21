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
import CommentIcon from 'material-ui-icons/Comment';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Badge from './Badge';
const styles = theme => ({
  card: {
    marginBottom:15,
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
  photo:{
    position:'relative',
  }
});

class RecipeReviewCard extends React.Component {
  render() {
    const { classes,image,user,date,uid,onUserClick } = this.props;
    return (
      <div>
        <Card className={classes.card} elevation={0} >
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar} onClick={onUserClick}>
                {user.name.substr(0,1)}
              </Avatar>
            }
            title={user.name}
            subheader={date}
          />
          <div className={classes.photo}>
            <Badge value={'20P'}/>
            <CardMedia
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />
          </div>
          <CardContent>
            <Typography component="p">Bucharest</Typography>
          </CardContent>
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
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);