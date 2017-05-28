// @flow
import React from 'react';
import {connect} from 'react-redux'
import {Button, Navbar, Nav, NavItem} from 'react-bootstrap';
import State from "../../model/State";
import {bindActionCreators} from "redux";
import * as Actions from "../../state/actions/ActionType";


const MyNavbar = (props: {login:boolean, logout:()=> void}) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                React demo
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        {
            props.login ? (
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem>
                                <Button bsStyle="danger" onClick={props.logout}>
                                    <span className="glyphicon glyphicon-log-out"></span> Log out
                                </Button>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                ) : null
        }

    </Navbar>
);

function logout() {
    return {
        type: Actions.LOGIN_LOGOUT
    };
}

function mapStateToProps(state: State) {
    return {
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
