import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import CreateIcon from 'material-ui-icons/Create';
import ShowSwitch from './ShowSwitch';
import classNames from 'classnames';
const styles =theme=> ({
    root:{
     position:'fixed',
     bottom: 72,
     right:16,
     zIndex:100
  }
});

const CreateButton=({classes,onClick})=>(
	<ShowSwitch direction="visibility" isSpace={false} render={({rootClass,rootStyle})=>(
	 <div  className={classNames(classes.root,rootClass)} style={rootStyle}>
	   <Button variant="fab" color="secondary" aria-label="edit" onClick={onClick}>
	     <CreateIcon/>
	   </Button>
	 </div>
	 )} />
)

export default  withStyles(styles)(CreateButton)