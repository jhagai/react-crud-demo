// @flow
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../../../state/actions/ActionType";
import {
    Col,
    FormGroup,
    ControlLabel,
    Row,
} from 'react-bootstrap'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import type {People} from "../../../model/people/People";
import {Action} from 'redux'
import State from "../../../model/State";
import {SimpleField, SimpleDate, SubmitButton} from "../../common";

function doFetch(fetchActionDispatcher: ((any) => void), fetchPeopleFailureDispatcher: (string) => void, values: {firstName:string}) {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    let url = '/people?';

    let queryString = Object.keys(values).map(
        (key: string) => {
            return `${key}=${values[key]}`;
        }
    ).join('&');

    url += queryString;

    return fetch(url, {method: 'GET', headers: myHeaders})
        .then(
            (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw {message: `Bad HTTP status code: ${res.status}`};
                }
            }
        ).then(
            (data) => {
                fetchActionDispatcher(data);
            }
        ).catch(
            (error) => {
                if (error && error.message) {
                    fetchPeopleFailureDispatcher(`Error while parsing fetched data: ${error.message}`);
                }
            }
        );
}

type myFormProps = {
    counter:number,
    dobStart:Date,
    dobEnd:Date,
    fetchPeople:() => void,
    fetchPeopleFailure: () => any,
    handleSubmit:(...any) => any,
    submitting:boolean
};

const searchForm = (props: myFormProps) => {

    return (
        <form
            onSubmit={props.handleSubmit( (values) => doFetch(props.fetchPeople, props.fetchPeopleFailure, values) )}>
            <Row>
                <Col xs={6}>
                    <Field name="firstName" component={SimpleField} type="text" placeholder="First name"
                           id="firstName"
                           label="First name"
                           normalize={(value:string) => {return value.substr(0,10)}}/>
                </Col>
                <Col xs={6}>
                    <Field name="lastName" component={SimpleField} type="text" placeholder="Last name"
                           id="lastName"
                           label="Last name" normalize={(value:string) => {return value.substr(0,10)}}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <FormGroup controlId="date" validationState={null}>
                        <ControlLabel>Date of birth</ControlLabel>
                        <Row>
                            <Col xs={6}>
                                <Field
                                    name="dobStart"
                                    showTime={false}
                                    component={SimpleDate}
                                    max={props.dobEnd}
                                    normalize={(value, previousValue, allValues) => value && allValues['dobEnd'] && value.getTime() > allValues['dobEnd'] ? allValues['dobEnd'] : value}
                                />
                            </Col>
                            <Col xs={6}>
                                <Field
                                    name="dobEnd"
                                    showTime={false}
                                    component={SimpleDate}
                                    min={props.dobStart}
                                    normalize={(value, previousValue, allValues) => value && allValues['dobStart'] && value.getTime() < allValues['dobStart'] ? allValues['dobStart'] : value}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col xs={12}>
                    <div className="text-right">
                        <SubmitButton submitting={props.submitting} label="Search"/>
                    </div>
                </Col>
            </Row>
        </form>

    );
}

const selector = formValueSelector('search');

function mapStateToProps(state: State) {
    const dobStart = selector(state, 'dobStart')
    const dobEnd = selector(state, 'dobEnd')
    return {
        dobStart,
        dobEnd
    }
}

function fetchPeople(value: People[]): Action {
    return {
        type: Actions.FETCH_PEOPLE_SUCCESS,
        value: value
    };
}

function fetchPeopleFailure(message: string): Action {
    return {
        type: Actions.FETCH_PEOPLE_ERROR,
        value: message
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPeople,
        fetchPeopleFailure
    }, dispatch)
}

const search = connect(mapStateToProps, mapDispatchToProps)(searchForm);

export default reduxForm({
    form: 'search',  // a unique identifier for this form
})(search)