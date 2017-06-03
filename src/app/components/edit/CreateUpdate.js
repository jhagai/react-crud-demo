// @flow

import React from 'react';
import {Field, formValueSelector} from "redux-form";
import {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    InputGroup
} from 'react-bootstrap'
import {SimpleField, SimpleDate} from "../common";
import required from "../common/validation/required";
import email from "../common/validation/email";
import parseSocialSecurityNumber from './parsers/SocialSecurityCodeParser'
import State from "../../model/State";
import {connect} from "react-redux";
import {SelectList} from 'react-widgets'
import *  as Sex from "../../model/people/Sex";

type SocialSecurityCode = {sex:?string, birthYear:?string, birthMonth:?string, departement:?string, commune:?string, birthNumber?:string, control?:string, rest:?string};


const formatter = (value: ?SocialSecurityCode) => {

    let result = '';
    if (value) {
        let valArray: string[] = [];
        value.sex && valArray.push(value.sex);
        value.birthYear && valArray.push(value.birthYear);
        value.birthMonth && valArray.push(value.birthMonth);
        value.departement && valArray.push(value.departement);
        value.commune && valArray.push(value.commune);
        value.birthNumber && valArray.push(value.birthNumber);
        value.rest && valArray.push(value.rest);
        result = valArray.join(' ');
    }
    return result;
}

const ssnNormalizer = (change: (field: string, value: any) => any, ssn: ?SocialSecurityCode) => {
    if (ssn && ssn.sex) {
        if (ssn.sex === "1" || ssn.sex === "3" || ssn.sex === "7") {
            change('sex', SEX_DATA_BY_VALUE[Sex.MALE]);
        } else {
            change('sex', SEX_DATA_BY_VALUE[Sex.FEMALE]);
        }
    }
    return ssn;
}

const ssnValidator = (value: SocialSecurityCode) => {
    let result;
    if (!value) {
        result = 'Required';
    } else if (!value.birthNumber) {
        result = 'Wrong format';
    }
    return result;
}

type SsnFieldProps = {id:string, label:?string, control:?string, input:any, placeholder:string, type:string, meta: {touched:boolean, dirty:boolean, invalid:boolean, error:string}}

const SsnField = (myProps: SsnFieldProps) => {
    const {id, label, input, placeholder, type, meta: {touched, dirty, invalid, error}} = myProps;

    const validationState = invalid && (touched || dirty) ? 'error' : null;

    return (
        <FormGroup controlId={id} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : null}
            <InputGroup>
                <FormControl {...input} type={type} placeholder={placeholder}/>
                <InputGroup.Addon>{myProps.control}</InputGroup.Addon>
            </InputGroup>
            {invalid && (touched || dirty) && error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>
    );
};

type SexComponentProps = {id:string, data:{value:string, text:string}[], disabledData:{value:string, text:string}[], label:?string, input:{onChange:any, value:{value:string, text:string}}, meta: {touched:boolean, dirty:boolean, invalid:boolean, error:string}}

const SexComponent = (myProps: SexComponentProps) => {
    const {id, label, input:{value, onChange}, meta: {touched, dirty, invalid, error}} = myProps;

    const validationState = invalid && (touched || dirty) ? 'error' : null;

    return (
        <FormGroup controlId={id} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : null}
            <SelectList onChange={onChange} value={value} valueField='value' textField='text'
                        data={myProps.data} disabled={myProps.disabledData}/>
            {invalid && (touched || dirty) && error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>
    );
};

const SEX_DATA: {value:string, text:string}[] = [{value: Sex.MALE, text: 'Male'}, {value: Sex.FEMALE, text: 'Female'}];
const SEX_DATA_BY_VALUE: {[key:string]:{value:string, text:string}} = SEX_DATA.reduce((accu: {[key:string]:{value:string, text:string}}, next) => {
    accu[next.value] = next;
    return accu;
}, {});

const getDisabledSexData = (ssn: ?SocialSecurityCode): ?{value:string, text:string}[] => {
    let result;
    if (ssn && ssn.sex) {
        if (ssn.sex === "1" || ssn.sex === "3" || ssn.sex === "7") {
            result = [SEX_DATA_BY_VALUE[Sex.FEMALE]];
        } else {
            result = [SEX_DATA_BY_VALUE[Sex.MALE]];
        }
    }
    return result;
};


const getSexValue = (currentValue: {value:string, text:string}, ssn: ?SocialSecurityCode): {value:string, text:string} => {
    let result = currentValue;
    if (ssn && ssn.sex) {
        if (ssn.sex === "1" || ssn.sex === "3" || ssn.sex === "7") {
            result = SEX_DATA_BY_VALUE[Sex.MALE];
        } else {
            result = SEX_DATA_BY_VALUE[Sex.FEMALE];
        }
    }
    return result
};

const Edit = (props: {submitting:boolean, ssn:SocialSecurityCode, sex:{value:string, text:string}, change:(field: string, value: any) => any, submitFailed:?boolean}) => {

    return (
        <section>
            <Row>
                <Col xs={6}>
                    <Field name="firstName" component={SimpleField} type="text" placeholder="First name"
                           label="First name" validate={required}
                           normalize={value => value ? value.substr(value,50) : value}/>
                </Col>
                <Col xs={6}>
                    <Field name="lastName" component={SimpleField} type="text" placeholder="Last name"
                           label="Last name" validate={required}
                           normalize={value => value ? value.substr(value,50) : value}/>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Field name="email" component={SimpleField} type="text" placeholder="email"
                           label="email" validate={[email,required]}/>
                </Col>
                <Col xs={6}>
                    <Field name="birthDate" component={SimpleDate} type="text" placeholder="DD/MM/YYYY" showTime={false}
                           max={new Date()}
                           label="Date of birth" validate={required}/>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Field name="ssn" component={SsnField} type="text" placeholder="ssn"
                           label="Social security number"
                           format={formatter}
                           parse={parseSocialSecurityNumber} validate={ssnValidator}
                           control={props.ssn && props.ssn.control ? props.ssn.control : ''}
                           normalize={value => ssnNormalizer(props.change,value)}
                    />
                </Col>
                <Col xs={3}>
                    <Field name="sex" component={SexComponent} type="text" placeholder="Sex"
                           label="Sex" data={SEX_DATA}
                           value={getSexValue(props.sex, props.ssn)}
                           disabledData={getDisabledSexData(props.ssn)}
                           validate={required}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ListGroup>
                        {props.ssn && props.ssn.sex ?
                            <ListGroupItem><label>Sex:</label> {props.ssn.sex}</ListGroupItem> : null}
                        {props.ssn && props.ssn.birthYear ?
                            <ListGroupItem><label>birthYear:</label> {props.ssn.birthYear}</ListGroupItem> : null}
                        {props.ssn && props.ssn.birthMonth ?
                            <ListGroupItem><label>birthMonth:</label> {props.ssn.birthMonth}</ListGroupItem> : null}
                        {props.ssn && props.ssn.departement ?
                            <ListGroupItem><label>departement:</label> {props.ssn.departement}</ListGroupItem> : null}
                        {props.ssn && props.ssn.commune ?
                            <ListGroupItem><label>commune:</label> {props.ssn.commune}</ListGroupItem> : null}
                        {props.ssn && props.ssn.birthNumber ?
                            <ListGroupItem><label>birthNumber:</label> {props.ssn.birthNumber}</ListGroupItem> : null}
                        {props.ssn && props.ssn.control ?
                            <ListGroupItem><label>control:</label> {props.ssn.control}</ListGroupItem> : null}
                        {props.ssn && props.ssn.rest ?
                            <ListGroupItem><label>rest:</label> {props.ssn.rest}</ListGroupItem> : null}
                    </ListGroup>
                </Col>
            </Row>
        </section>
    );
};

const selector = formValueSelector('edit');

function mapStateToProps(state: State) {
    const ssn = selector(state, 'ssn');
    const sex = selector(state, 'sex');
    return {
        ssn,
        sex
    };
}

export default connect(mapStateToProps)(Edit)
