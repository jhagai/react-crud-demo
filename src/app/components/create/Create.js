// @flow

import React from 'react';
import {connect} from "react-redux";
import {SubmissionError, formValueSelector, reduxForm} from "redux-form";
import {Row, Col} from 'react-bootstrap'
import CreateUpdate from '../edit/CreateUpdate'
import State from "../../model/State";
import {SubmitButton, SimpleModal} from "../common";
import {bindActionCreators} from "redux";

const createPerson = (values) => {
    let url = '/people';
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    return fetch(url, {method: 'POST', headers: myHeaders, body: JSON.stringify(values)}).then(
        (res) => {
            if (!res.ok) {
                throw new SubmissionError(
                    {_error: `Bad HTTP status code: ${res.status}`}
                );
            }
        }
    ).catch(
        (error) => {
            if (error && error.message) {
                throw new SubmissionError({_error: error.message});
            } else {
                throw new SubmissionError({_error: 'Creation failed'});
            }
        }
    );
}


const Create = (props: {handleSubmit:any, submitting:boolean, submitSucceeded:boolean, submitFailed:boolean, reset:() => void}) => {
    return (
        <form noValidate onSubmit={props.handleSubmit(createPerson)}>
            <SimpleModal title="Success" body="Creation successful" show={props.submitSucceeded && !props.submitting} close={props.reset}/>
            <SimpleModal title="Failure" body="Creation failed" show={props.submitFailed && props.error && !props.submitting}/>
            <Row>
                <Col xs={12}>
                    <h1 className="page-header">Create</h1>
                    <CreateUpdate {...props}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="text-right">
                        <SubmitButton submitting={props.submitting} label="Create"/>
                    </div>
                </Col>
            </Row>
        </form>
    );
}

const selector = formValueSelector('edit');

function mapStateToProps(state: State) {
    const ssn = selector(state, 'ssn');
    const sex = selector(state, 'sex');
    return {
        ssn,
        sex
    };
}

export default connect(mapStateToProps)(
    reduxForm({
        form: 'edit',
        enableReinitialize: true
    })(Create)
)