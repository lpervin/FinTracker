import React, { Component } from 'react';
import clsx from "clsx";
import { withRouter } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";


import { Link as MaterialLink } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import * as Icons from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons/faEdit'
import './NavMenu.css'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({    
  root: {
    display: 'flex'
  },
    appBar: {
        position: "relative",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
      menuButton: {
        marginRight: theme.spacing(2),
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
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
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
     const theme = useTheme();
         /**Main Navigation Links **/
             const loc = props.location.pathname;
             const links = ['/portfolio', '/research', '/trade'];
             //console.log(loc)
             const index = links.indexOf(loc) === -1 ? 0 : links.indexOf(loc);
             const  [tabIndex, setValue] = React.useState(index);
    
             const tabChanged = (event,newValue) => {
                 console.log(newValue)
                 setValue(newValue)
             };
        /*******/
     
        /****Drawer******/
        const [isOpen, setOpen] = React.useState(false)
        const toggleDrawer = () => {
            const menuState = !isOpen;
            setOpen(menuState);
            props.toggleMenu(menuState);
        };
        /**********/
     
    
    return (
        <div className={classes.root}>
            <AppBar  position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: isOpen,
            })}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" aria-label="open drawer" 
                                className={clsx(classes.menuButton, isOpen && classes.hide)}
                                onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Tabs value={tabIndex} onChange={tabChanged} aria-label="Tabs">
                        <Tab label="Portfolio" component={MaterialLink} href="/portfolio" id="item-0" color="inherit"  classes={{ root: classes.tabItem }}/>
                        <Tab label="Research" component={MaterialLink} href="/research" id="item-2" color="inherit"  classes={{ root: classes.tabItem }}/>
                        <Tab label="Trade" component={MaterialLink}  href="/trade"  id="item-3"  color="inherit"  classes={{ root: classes.tabItem }}/>
                    </Tabs>
               {/*     <Typography variant="h6">
                        {tabIndex}
                    </Typography>*/}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                   
                        <ListItem  component={MaterialLink} href="/finsecurity">
                            <ListItemIcon>
                                {/*<Icons.AddBox />*/}
                                <FontAwesomeIcon  icon={faEdit}/>
                            </ListItemIcon>
                            <ListItemText primary="Manage Securities" />
                            
                        </ListItem>
                                  </List>
                <Divider />
                {/*<List>*/}
                {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                {/*        <ListItem button key={text}>*/}
                {/*            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                {/*            <ListItemText primary={text} />*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
            </Drawer>
        </div>
      
        
    );  
}

export default withRouter(NavMenu)