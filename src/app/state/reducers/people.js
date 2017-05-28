// @flow

import * as Actions from '../actions/ActionType'
import initialState from '../InitialState'
import type {People} from "../../model/people/People";
import {Reducer, Action} from 'redux'

const people: Reducer<People> = function (state: People = initialState.people, action: Action) {
    switch (action.type) {
        case Actions.FETCH_PEOPLE_START:
            return {...state, success: null, error: null};
        case Actions.FETCH_PEOPLE_SUCCESS:
            return {...state, success: action.value, error: null};
        case Actions.FETCH_PEOPLE_ERROR:
            return {...state, success: null, error: action.value};
        case Actions.LOGIN_LOGOUT:
            return initialState.people;
        default:
            return state;
    }
}

export default people