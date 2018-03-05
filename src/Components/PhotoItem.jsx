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
import {IMG_URL,DB_URL} from '../actions/public';
import {getSrcSize} from '../public/tool';
import Menu, { MenuItem } from 'material-ui/Menu';
import {postDate} from '../public/tool';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';

const styles = theme => ({
  subsidiary:{
    paddingTop:15,
    //height:15,
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
  state = {
      auth: true,
      anchorEl: null,
    };
  getHeight(cover){
    return (cover.height/cover.width)*370
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  getMenu(){
    let {doc,selfUser}=this.props;
    if(doc.name==selfUser.name){
        return [<MenuItem key="0" onClick={(e)=>{
          this.props.onEdit(e,doc);
          this.handleClose();
        }}>编辑</MenuItem>,
        <MenuItem key="1" onClick={(e)=>{
          this.props.onDel(e,doc);
          this.handleClose();
        }}>删除</MenuItem>
      ]
    }else{
        return <MenuItem key="0" onClick={(e)=>{
          this.props.cancelSubscribe(e,doc);
          this.handleClose();
        }}>不再关注</MenuItem>
    }
  }
  onAvatar(e,doc){
    this.props.pushAct(`/user/${doc.name}`)
  }
  render() {
    const { classes,doc,selfUser } = this.props;

    const { auth, anchorEl } = this.state;
    const menuOpen = Boolean(anchorEl);

    let cover;
    if(doc._attachments){
      let imagelist=Object.keys(doc._attachments);
      cover=getSrcSize(imagelist[imagelist.length-1])
    }
    return (
      <div>
        <div className={classes.subsidiary}>
        </div>
        <Card className={classes.card} elevation={1}>
          <CardHeader
            avatar={
              doc.avatar_url?
              <Avatar 
              onClick={(e)=>this.onAvatar(e,doc)} 
              aria-label={doc.name.substr(0,1)} src={`${DB_URL}${doc.avatar_url}`} className={classes.avatar} />:
              <Avatar  
              onClick={(e)=>this.onAvatar(e,doc)} 
              className={classes.avatar} >{doc.name.substr(0,1)}</Avatar>
            }

            title={doc.name}
            subheader={postDate(doc.date)}
            action={
                   <IconButton  onClick={this.handleMenu}>
                     <MoreVertIcon />
                   </IconButton>
                 }
          />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={menuOpen}
            onClose={this.handleClose}
          >
            {this.getMenu()}
          </Menu>
          {cover && <CardMedia
             className={classes.media}
             image={`${DB_URL}${doc._id}/${cover.src}`}
             title={doc.text} 
             style={{height:this.getHeight(cover)}}
             onClick={(e)=>this.props.onCoverClick(e,doc)}
           />}
          <CardContent>
            {doc.text && <Typography component="div">
              <div 
              className={classes.text} 
              dangerouslySetInnerHTML={{__html:doc.text}}>
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

const mapStateToProps=(state)=>({})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  pushAct:push
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(PhotoItem));