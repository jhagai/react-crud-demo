// @flow

import React from 'react';
import {connect} from "react-redux";
import {SubmissionError, submit, isSubmitting} from "redux-form";
import {Button, Row, Col} from 'react-bootstrap'
import Edit from '../edit/Edit'
import {bindActionCreators} from "redux"

const createPerson = (values) => {
    let url = '/people';
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    return fetch(url, {method: 'POST', headers: myHeaders, body: JSON.stringify(values)})
        .then(
            (res) => {
                if (res.ok) {
                    alert('success');
                } else {
                    throw new SubmissionError(
                        {message: `Bad HTTP status code: ${res.status}`}
                    );
                }
            }
        ).catch(
            (error) => {
                if (error && error.message) {
                    alert(error);
                    //fetchPeopleFailureDispatcher(`Error while parsing fetched data: ${error.message}`);
                }
            }
        );
}


const Create = (props: {submit:any, submitting:boolean}) => {
    return (
        <section>
            <Row>
                <Col xs={12}>
                    <h1 className="page-header">Create</h1>
                    <Edit submitFn={(values) => createPerson(values)}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="text-right">
                        <Button bsStyle="primary"
                                disabled={props.submitting} onClick={() => props.submit('edit')}>
                            {props.submitting ?
                                <section><i className='fa fa-circle-o-notch fa-spin'></i> Loading
                                </section> : 'Create' }
                        </Button>
                    </div>
                </Col>
            </Row>
        </section>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submit
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        submitting: isSubmitting('edit')(state)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Create)