// @flow
import * as React from "react";
import {connect} from "react-redux";
import {
    Row,
    Col
} from 'react-bootstrap'
import type {People} from "../../model/people/People";
import State from "../../model/State";
import Result from './result/Result'
import SearchForm from './searchForm/SearchForm'
import { isSubmitting } from 'redux-form';


type myFormProps = {
    fetchedPeople:People,
    submitting:boolean
};

const searchForm = (props: myFormProps) => {

    return (
        <section>
            <Row>
                <Col xs={12}>
                    <h1 className="page-header">Search</h1>
                    <SearchForm/>
                </Col>
            </Row>
            <Result fetchedPeople={props.fetchedPeople} submitting={props.submitting}/>
        </section>
    );
}

function mapStateToProps(state: State) {
    return {
        fetchedPeople: state.people,
        submitting: isSubmitting('search')(state)
    }
}

export default connect(mapStateToProps)(searchForm);

