import React, {Component} from 'react'
import NavMenu from "./NavMenu";
import Container from '@material-ui/core/Container'
import './NavMenu.css'


class Layout extends Component {
  
    render() {
        const styles = {root: { paddingTop: 150 }}
        return (
            <React.Fragment>
                <NavMenu/>                
                <Container className="page-content">
                    {this.props.children}   
                </Container>                
            </React.Fragment>
                
            
        );
    }
}

export default  Layout;
