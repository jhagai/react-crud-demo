// @flow
import * as React from "react";
import type {People} from "../../../model/people/People";
import {
    Col,
    Row,
    Table,
    Pagination,
    Button,
    Collapse
} from 'react-bootstrap'
import EditModal from "../editModal/EditModal";
import Person from "../../../model/people/Person";


const NB_ENTRY_BY_PAGE = 5;

const RenderResult = (params: {fetchedPeople:People, currentPage:number, person:?Person, changePage:(page: number) => void, selectPerson:(person: ?Person) => void}) => {

    let fetchedPeople: People = params.fetchedPeople;

    let success = fetchedPeople.success || [];
    let nbPages: number = Math.ceil(success.length / NB_ENTRY_BY_PAGE);

    let peopleToDisplay = success.slice((params.currentPage - 1) * NB_ENTRY_BY_PAGE, (params.currentPage - 1) * NB_ENTRY_BY_PAGE + NB_ENTRY_BY_PAGE);

    let result = (
        <section>
            <EditModal person={params.person} cancel={() => params.selectPerson(null)}/>
            <Collapse in={!!success.length}>
                <section>
                    <Row>
                        <Col xs={12}>
                            <h2>Results</h2>
                            <Table striped bordered condensed hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Edit</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    peopleToDisplay.map((person) => {
                                        return (<tr key={person.id}>
                                            <td>{person.id}</td>
                                            <td>{person.firstName}</td>
                                            <td>{person.lastName}</td>
                                            <td>TODO</td>
                                            <td>
                                                <Button bsStyle="primary" onClick={() => params.selectPerson(person)}>
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>)
                                    })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="text-center">
                            <Pagination
                                bsSize="large"
                                items={nbPages}
                                activePage={params.currentPage}
                                onSelect={(page) => {params.changePage(page)}}/>
                            <br />
                        </Col>
                    </Row>
                </section>
            </Collapse>
            <Collapse in={!!fetchedPeople.error}>
                <Row>
                    <Col xs={12}>
                        {fetchedPeople.error}
                    </Col>
                </Row>
            </Collapse>
        </section>
    );

    return result;
}


class Result extends React.PureComponent<any, {fetchedPeople:People}, {currentPage:number, selectedPerson:?Person}> {
    state: {currentPage:number, selectedPerson:?Person};

    constructor(props: {fetchedPeople:People}) {
        super(props);
        this.state = {currentPage: 1, selectedPerson: null};
    }

    render() {
        return RenderResult({
            fetchedPeople: this.props.fetchedPeople,
            currentPage: this.state.currentPage,
            person: this.state.selectedPerson,
            changePage: (page: number) => {
                this.setState(
                    (previousState) => {
                        return {...previousState, currentPage: page}
                    }
                )
            },
            selectPerson: (person: ?Person) => {
                this.setState(
                    (previousState) => {
                        return {...previousState, selectedPerson: person}
                    }
                )
            }
        });
    }
}

export default Result