import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link as MaterialLink } from "@material-ui/core";
//import Link from "@material-ui/core/Link";
import './NavMenu.css'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative"
    },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nav: {
    flexGrow: 1,
      baseline: '1',
      display: 'flex',
      justifyContent: 'space-evenly'
  },
   navlink: {
      'color': '#FFFF',
     '&:hover': {color: '#F0FFFF', textDecoration: 'none'}
   } ,
    tabItem: {
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        minWidth: "auto",
        'color': '#FFFF',
        '&:hover': {color: '#F0FFFF', textDecoration: 'none'}
    }
    
}));


 function NavMenu(props) {
     const classes = useStyles();

     const loc = props.location.pathname;
     const links = ['/portfolio', '/research', '/trade'];
     //console.log(loc)
     const index = links.indexOf(loc) === -1 ? 0 : links.indexOf(loc);
     const  [tabIndex, setValue] = React.useState(index);
    
     const tabChanged = (event,newValue) => {
         console.log(newValue)
         setValue(newValue)
     };
     
    // const classes = this.useStyles();

    return (
        <AppBar  position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
              <Tabs value={tabIndex} onChange={tabChanged} aria-label="Tabs">
                  <Tab label="Portfolio" component={MaterialLink} href="/portfolio" id="item-0" color="inherit"  classes={{ root: classes.tabItem }}/>
                  <Tab label="Research" component={MaterialLink} href="/research" id="item-2" color="inherit"  classes={{ root: classes.tabItem }}/>
                  <Tab label="Trade" component={MaterialLink}  href="/trade"  id="item-3"  color="inherit"  classes={{ root: classes.tabItem }}/>
              </Tabs>
              <Typography variant="h6">
                  {tabIndex}
              </Typography>
          {/*  <Typography variant="h6" className={classes.nav}>
                <Link href="/portfolio"  color="inherit" className={classes.navlink}>
                   Portfolio
                </Link>
                
                <Link href="/research" color="inherit" className={classes.navlink}>
                    Research
                </Link>
                { ' ' }
                <Link href="/trade" color="inherit" className={classes.navlink}>
                    Trade
                </Link>
            </Typography>*/}
            {/*<Button color="inherit">Login</Button>*/}
          </Toolbar>
        </AppBar>
        
    );  
}

export default withRouter(NavMenu)