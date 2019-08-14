import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormatColorFill from '@material-ui/icons/FormatColorFill';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BorderColor from '@material-ui/icons/BorderColor';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '85px',
  },
  fab: {
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px'
  },
  colorPicker: {
      height: '20px',
      width: '100px',
      marginTop: '10px',
      marginBottom: '10px',
      marginLeft: '20px',
      marginRight: '10px',
      borderRadius: '5px'
  },
  headers: {
      marginLeft: 10
  },
  dividers: {
      marginTop: 10,
      marginBottom: 10
  },
  button: {
      color: '#fff'
  }
}));

const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
      width: 220,
      marginLeft: 20,
      marginBottom: 5
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const PersistentDrawerRight = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const { openPicker, selectedColor, currentShape, sendToBack, bringToFront, onChangeShape } = props;

  return (
    <div>
        <div className="floating-buttons">
            <Fab color="primary" aria-label="add" className={classes.fab} style={{backgroundColor: selectedColor}} onClick={ openPicker }>
                <FormatColorFill />
            </Fab>
            <Fab color="secondary" aria-label="edit" className={classes.fab} onClick={handleDrawerOpen} >
            <BorderColor />
            </Fab>
        </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider className={classes.dividers} />
            <Typography gutterBottom className={classes.headers}>Color</Typography>
            <div className={classes.colorPicker} style={{backgroundColor: selectedColor}} onClick={ openPicker } />
            <Typography gutterBottom className={classes.headers}>Opacity</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={currentShape && currentShape.props.opacity * 100} defaultValue={100} 
                          onChange={(event, value) => onChangeShape("opacity", value/100)}
                          />
        <Divider className={classes.dividers} />
            <div className="shape-props">
                <TextField
                    id="outlined-number"
                    label="Width"
                    value={currentShape && currentShape.props.width}
                    onChange={(event) => onChangeShape("width", event.target.value)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-number"
                    label="Height"
                    value={currentShape && currentShape.props.height}
                    onChange={(event) => onChangeShape("height", event.target.value)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-number"
                    label="Top"
                    value={currentShape && currentShape.props.top}
                    onChange={(event) => onChangeShape("top", event.target.value)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-number"
                    label="Left"
                    value={currentShape && currentShape.props.left}
                    onChange={(event) => onChangeShape("left", event.target.value)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-number"
                    label="Rotation"
                    value={currentShape && currentShape.props.rotate}
                    onChange={(event) => onChangeShape("rotate", event.target.value)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
            </div>
            <Divider className={classes.dividers} />
            <div className="shape-props">
                <Button variant="contained" color="secondary" className={classes.button} onClick={ sendToBack } >
                    Send Back
                </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={ bringToFront } >
                    Bring Front
                </Button>
            </div>
      </Drawer>
    </div>
  );
}

export default PersistentDrawerRight;