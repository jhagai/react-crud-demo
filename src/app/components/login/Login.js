// @flow

import React from 'react';
import {Row, Col, Modal, Button} from 'react-bootstrap'
import {reduxForm, Field} from 'redux-form'
import {SimpleField, SubmitButton} from "../common";
import authenticate from '../../services/Auth'
import {connect} from 'react-redux'
import {Action, bindActionCreators} from 'redux'
import * as Actions from "../../state/actions/ActionType";
import State from "../../model/State";
import {withRouter, Link} from 'react-router-dom'

type LoginFormProps = {
    handleSubmit:(...any) => any,
    submitting:boolean,
    loginSuccess:() => Action,
    loginFailure:() => Action,
    loginReset:() => Action,
    login:?boolean,
    history:any
};

const Form = (props: LoginFormProps) => {
    return (
        <form noValidate
            onSubmit={props.handleSubmit((allValues) => authenticate(props.loginSuccess, props.loginFailure, props.history, allValues.email, allValues.password))}>
            <Row>
                <Col xs={12}>
                    <Field name="email" component={SimpleField} type="email" placeholder="Email"
                           id="email"
                           label="Email"/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Field name="password" component={SimpleField} type="password" placeholder="Password"
                           id="password"
                           label="Password"/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="text-right">
                    <SubmitButton submitting={props.submitting} label="Submit"/>
                </Col>
            </Row>
        </form>
    );
}

const LoginForm = (props: LoginFormProps) => {

    const modalInstance = (
        <div className="static-modal">
            <Modal show={props.login !== null && !props.login}>
                <Modal.Header>
                    <Modal.Title>Login failed</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Please try logging again
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.loginReset}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    const content = props.logged ?
        <section>
            You are already logged in go to <Link to="/search">search</Link>
        </section>
        : <Form {...props} />;

    return (
        <section>
            {modalInstance}
            <Row>
                <Col xs={12} smPush={3} sm={6}>
                    <h1 className="page-header">Login</h1>
                    {content}
                </Col>
            </Row>
        </section>
    );
}

function validate(values) {
    let errors = {};

    if (!values.email) {
        errors.email = 'Please enter your email';
    }

    if (!values.password) {
        errors.password = 'Please enter your password';
    }

    return errors;
}

function loginReset(): Action {
    return {
        type: Actions.LOGIN_RESET,
    };
}

function loginSuccess(): Action {
    return {
        type: Actions.LOGIN_SUCCESS,
    };
}

function loginFailure(): Action {
    return {
        type: Actions.LOGIN_FAILURE,
    };
}

function mapStateToProps(state: State) {
    const login = state.login;
    return {
        login
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginSuccess,
        loginFailure,
        loginReset,
    }, dispatch);
}

const LoginFormConnected = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default reduxForm({
    form: 'login',  // a unique identifier for this form
    validate: validate
})(withRouter(LoginFormConnected))