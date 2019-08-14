import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import square from '../square.svg'
import circle from '../circle.svg'
import rectangle from '../rectangle.svg'
import triangle from '../triangle.svg'
import drag from '../drag.svg'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
      backgroundColor: '#0d47a1'
  },
  button: {
    margin: theme.spacing(1),
    position: 'fixed',
    right: '5px',
    top: '-2px'
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const AppNav = (props) => {
  const { selectShape } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<img style={{width: '30px', height: '30px'}} src={circle} alt="circle" />} aria-label="phone" {...a11yProps(0)} onClick={() => selectShape('Circle')} />
          <Tab icon={<img  style={{width: '30px', height: '30px'}} src={rectangle} alt="rectangle" />} aria-label="favorite" {...a11yProps(1)} onClick={() => selectShape('Rectangle')} />
          <Tab icon={<img style={{width: '30px', height: '30px'}} src={square} alt="square" />} aria-label="person" {...a11yProps(2)} onClick={() => selectShape('Square')} />
          <Tab icon={<img style={{width: '30px', height: '30px'}} src={triangle} alt="triangle" />} aria-label="help" {...a11yProps(3)} onClick={() => selectShape('Triangle')} />
          <Tab icon={<img style={{width: '30px', height: '30px'}} src={drag} alt="cursor" />} aria-label="shopping" {...a11yProps(4)} onClick={() => selectShape('')} />
        </Tabs>
        
      </AppBar>
    </div>
  );
}

export default AppNav;