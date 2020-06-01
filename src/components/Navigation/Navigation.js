import React from 'react';
import { connect } from 'react-redux';
import "./Navigation.scss";
import * as actionTypes from '../../store/actions';
import Record from "../Record/Record";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Navigation(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><MusicNoteIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Record" />
                </ListItem>
            </List>
        </div>
    );

  return (
    <div className={'Navigation ' + classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={event => props.handleDrawerToggle(true)}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className="logo" variant="h6" noWrap>
                  DieProduktMacher
                </Typography>
            </Toolbar>
        </AppBar>
        <Router>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                  <Drawer
                      container={container}
                      variant="temporary"
                      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                      open={props.toggleSidebar}
                      onClose={event => props.handleDrawerToggle(false)}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      ModalProps={{
                        keepMounted: true,
                      }}>
                      
                      {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                      classes={{
                      paper: classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                  >
                      {drawer}
                  </Drawer>
                </Hidden>
            </nav>
            
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route exact path="/" component={Record} />
            </main>
        </Router>
    </div>
  );
}

//redux to manage a state when open and close the sidebar
const mapStateToProps = state => {
  return {
    toggleSidebar: state.toggleSidebar
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleDrawerToggle: (value) => {
      dispatch({ type: actionTypes.TOGGLE_SIDEBAR, value })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);