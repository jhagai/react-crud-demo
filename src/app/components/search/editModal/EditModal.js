// @flow

import React from 'react';
import {connect} from "react-redux";
import {SubmissionError, reduxForm, formValueSelector, submit} from "redux-form";
import {Modal, Button} from 'react-bootstrap'
import CreateUpdate from '../../edit/CreateUpdate'
import Person from "../../../model/people/Person";
import State from "../../../model/State";
import {SubmitButton, SimpleModal} from '../../common'
import {bindActionCreators} from "redux";


const updatePerson = (personId: number, values) => {
    let url = '/people/' + personId;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    return fetch(url, {method: 'PUT', headers: myHeaders, body: JSON.stringify(values)})
        .then(
            (res) => {
                if (!res.ok) {
                    throw new SubmissionError(
                        {message: `Bad HTTP status code: ${res.status}`}
                    );
                }
            }
        ).catch(
            (error) => {
                if (error && error.message) {
                    throw new SubmissionError(
                        {_error: error.message}
                    );
                } else {
                    throw new SubmissionError(
                        {_error: "Update failed."}
                    );
                }
            }
        );
}

type EditModalProps={handleSubmit:any, person:?Person, submitSearch:()=>void, cancel:() => void, submitting:boolean, error:?any, submitSucceeded:boolean, submitFailed:boolean};

function closeSuccessPopup(props:EditModalProps) {
    props.cancel();
    props.submitSearch();
}

const EditModal = (props: EditModalProps) => {

    const personId = props.person ? props.person.id : 0;
    return (
        <section>
            <SimpleModal title="Success" body="Update successful" show={props.submitSucceeded && !props.submitting} close={() => closeSuccessPopup(props)}/>
            <SimpleModal title="Failure" body="Update failed" show={props.submitFailed && props.error && !props.submitting}/>
            <div className="static-modal">
                <Modal show={!!props.person && (!props.submitSucceeded || props.submitting)}>
                    <form noValidate onSubmit={props.handleSubmit((values) => updatePerson(personId, values))}>
                        <Modal.Header>
                            <Modal.Title>Edit user data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreateUpdate {...props}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <SubmitButton submitting={props.submitting} label="Update"/>
                            <Button onClick={props.cancel}>Cancel</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        </section>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitSearch: () => submit('search')
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'edit'
    })(EditModal)
)