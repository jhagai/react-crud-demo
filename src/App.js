// @flow

import React from 'react';
import {Grid, Tabs, Tab, Row} from 'react-bootstrap';
import Search from './app/components/search/Search'
import Create from './app/components/create/Create'
import Login from './app/components/login/Login'
import MyStore from './app/state/MyStore'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect, Switch, withRouter} from 'react-router-dom'
import State from "./app/model/State";
import MyNavbar from "./app/components/myNavbar/MyNavbar"

function mapStateToProps(state: State) {
    return {
        login: state.login
    }
}

const PrivateRoute = connect(mapStateToProps)(withRouter(
    (props: {login:boolean, path:string, component:any, activeKey:number, history:any, location:any}) => {
        let myComponent = Login;
        if (props.login) {
            myComponent = () => (
                <Tabs activeKey={props.location.pathname} onSelect={(key) => {props.history.push(key);}}
                      id="controlled-tab-example">
                    <Tab eventKey={'/search'} title="Search"><Search/></Tab>
                    <Tab eventKey={'/create'} title="Create"><Create/></Tab>
                </Tabs>
            );
        }

        return (
            <Route path={props.path} component={myComponent}/>
        );
    }
));

const App = () => {
    return (
        <Provider store={MyStore()}>
            <Router>
                <Grid>
                    <Row>
                        <MyNavbar/>
                    </Row>
                    <Row>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/search" activeKey={2} component={Search}/>
                            <PrivateRoute path="/create" activeKey={1} component={Search}/>
                            <Redirect to="/login"/>
                        </Switch>
                    </Row>
                </Grid>
            </Router>
        </Provider>
    );
}

export default App;
