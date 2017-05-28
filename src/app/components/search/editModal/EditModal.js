// @flow

import React from 'react';
import {connect} from "react-redux";
import {SubmissionError, submit} from "redux-form";
import {Modal, Button} from 'react-bootstrap'
import Edit from '../../edit/Edit'
import Person from "../../../model/people/Person";
import {bindActionCreators} from "redux";


const updatePerson = (personId: number, values) => {
    let url = '/people/' + personId;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    return fetch(url, {method: 'PUT', headers: myHeaders, body: JSON.stringify(values)})
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


const EditModal = (props: {person:?Person, cancel:() => void, submit:any}) => {

    const personId = props.person ? props.person.id : 0;
    return (

        <div className="static-modal">
            <Modal show={!!props.person}>
                <Modal.Header>
                    <Modal.Title>Edit user data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Edit initialValues={props.person} submitFn={(values) => updatePerson(personId, values)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" bsStyle="primary" onClick={() => props.submit('edit')}>Submit</Button>
                    <Button onClick={props.cancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submit
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(EditModal)