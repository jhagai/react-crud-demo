// @flow

import React from 'react';
import {Button} from 'react-bootstrap'

const SubmitButton = (props: {submitting:boolean, label:string, input?:{onClick:() => void}}) => {
    return (
        <Button {...props.input} bsStyle="primary"
                type="submit"
                disabled={props.submitting}>{props.submitting ?
            <section><i className='fa fa-circle-o-notch fa-spin'></i> Loading
            </section> : props.label }
        </Button>
    );
}

export default SubmitButton