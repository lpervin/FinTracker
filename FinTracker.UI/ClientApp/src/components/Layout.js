import React, {Component} from 'react'
import clsx from "clsx";
import makeStyles  from '@material-ui/core/styles/makeStyles';
import NavMenu from "./NavMenu";
import Container from '@material-ui/core/Container'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
            content: {
                flexGrow: 1,
                padding: theme.spacing(3),
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                
            },
            contentShift: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: drawerWidth,
            },
    }));

    export default  function Layout(props)  {
        const classes = useStyles();
        const [open, setOpen] = React.useState(false);
       const handleMenuOpen = (isOpen) => {
            setOpen(isOpen)
            //console.log(isOpen)           
        };
        
            return  (
                <React.Fragment>
                    <NavMenu toggleMenu={handleMenuOpen}/>
                    <Container
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        {props.children}
                    </Container>
                </React.Fragment>            
            );
        
    }


