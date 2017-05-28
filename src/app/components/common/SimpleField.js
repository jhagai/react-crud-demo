// @flow

import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

type SimpleFieldProps = {id:string, label:?string, input:any, placeholder:string, type:string, meta: {touched:boolean, dirty:boolean, invalid:boolean, error:string}}

const SimpleField = (myProps: SimpleFieldProps) => {
    const {id, label, input, placeholder, type, meta: {touched, dirty, invalid, error}} = myProps;

    const validationState = invalid && (touched || dirty) ? 'error' : null;

    return (
        <FormGroup controlId={id} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : null}
            <FormControl {...input} type={type} placeholder={placeholder}/>
            {invalid && (touched || dirty) && error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>
    );
}

export default SimpleField