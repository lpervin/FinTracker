import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


 function NavMenu(props) {
     const classes = useStyles();
  
     const loc = props.location;
    // const classes = this.useStyles();
    // console.log(loc)
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News {loc.pathname}
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        
    );  
}

export default withRouter(NavMenu)