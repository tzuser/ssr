import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class AlertDialog extends React.Component {
  state = {
    open: false,
  };
  render() {
    let {open,title,content,btns,btnClick,handleClose} = this.props;
    return (
        <Dialog
          open={open}
          onClose={(e)=>handleClose(e,item)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {btns.map((item,key)=>(
              <Button key={key} onClick={(e)=>btnClick(e,item)} color="primary">
                {item.name}
              </Button>
              ))}
          </DialogActions>
        </Dialog>
    );
  }
}

export default AlertDialog;