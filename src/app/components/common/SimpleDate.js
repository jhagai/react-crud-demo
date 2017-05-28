import React from 'react'
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {DateTimePicker} from 'react-widgets'

export default ({id, showTime, min, max, label, input: {onChange, value}, meta: {touched, dirty, invalid, error}}) => {

    const validationState = invalid && (touched || dirty) ? 'error' : null;

    return (
        <FormGroup controlId={id} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : null}
            <DateTimePicker
                onChange={onChange}
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                time={showTime}
                value={!value ? null : new Date(value)}
                min={min}
                max={max}
            />
            {invalid && (touched || dirty) && error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>

    );
}