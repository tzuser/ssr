import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import Badge from '../Components/Badge';
const styles = theme => ({
  root: {
    display: 'flex',
    background: theme.palette.background.paper,
    width:"100%",
    overflow: 'hidden',
    paddingTop: 4,
  },
  gridList: {
    width: 'calc(100% + 4px)',
  },
  subheader: {
    width: '100%',
  },

});


class ImageGridList extends PureComponent{

  render() {
    const { classes } = this.props;
    const tileData = [
        {
          img: 'http://img.360meimei.com/titlepic/2017/03/01/525trwdl1zv.jpg',
          title: 'Image',
          author: 'author',
          cols: 2,
        },
        {
          img: 'http://img.360meimei.com/titlepic/2017/03/04/12cz5jwjqr2.jpg',
          title: 'Image',
          author: 'author',
          cols: 1,
        },
        {
          img: 'http://img.360meimei.com/titlepic/2017/03/04/j0hnxoj2lj2.jpg',
          title: 'Image',
          author: 'author',
          cols: 1,
        },
        {
          img: 'http://img.360meimei.com/titlepic/2017/03/01/wpy4axqo3h3.jpg',
          title: 'Image',
          author: 'author',
          cols: 1,
        },
        {
          img: 'http://img.360meimei.com/titlepic/2017/03/01/ww3012msym3.jpg',
          title: 'Image',
          author: 'author',
          cols: 1,
        },
    ]
    return (
      <div className={classes.root}>
        <GridList cellHeight={120} className={classes.gridList} cols={3}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img src={tile.img} alt={tile.title} />
              <Badge size="small" value={'60P'}/>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);