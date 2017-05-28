// @flow

type EditFormModel = {
    firstName:string,
    lastName:string,
    email:string,
    dob:Date,
    ssn:string
}

export default (values:EditFormModel) => {
    let errors = {};
    if(!values.firstName) {
        errors.firstName = 'First name is mandatory';
    }

    if(!values.lastName) {
        errors.firstName = 'Last name is mandatory';
    }

    if(!values.email) {
        errors.email = 'Email is mandatory';
    }

    if(!values.ssn) {
        errors.ssn = 'SecurityCode is mandatory';
    }

    return errors;
}