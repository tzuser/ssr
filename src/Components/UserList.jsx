import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FavoriteIcon from 'material-ui-icons/Favorite';
const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.PureComponent {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes,isOwn,onUserClick} = this.props;

    return (
      <div className={classes.root}>
        <List>
          {[0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13].map((item,key) => (
            <ListItem key={key} dense button className={classes.listItem} onClick={(e)=>onUserClick(item)}>
              <Avatar alt="Remy Sharp" src="http://www.qqzhuangban.com/uploadfile/2015/01/1/20150109054231231.jpg" />
              <ListItemText primary={`Line item ${key + 1}`} />
              <ListItemSecondaryAction>
                {isOwn?(
                  <IconButton aria-label="Comments">
                    <DeleteIcon />
                  </IconButton>
                  ):(
                  <IconButton aria-label="Comments">
                    <FavoriteIcon />
                  </IconButton>
                 
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);