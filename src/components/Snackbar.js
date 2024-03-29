import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const SnackBar = (props) => {
    const { message, isOpen, closeMessage } = props;

    const classes = useStyles();

    return (
        <div>
        <Snackbar
            key={message}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={isOpen}
            autoHideDuration={3000}
            onClose={() => closeMessage()}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[
            <Button key="undo" color="secondary" size="small" onClick={() => closeMessage()}>
                DISMISS
            </Button>,
            <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={() => closeMessage()}
            >
                <CloseIcon />
            </IconButton>,
            ]}
        />
        </div>
    );
}

export default SnackBar;