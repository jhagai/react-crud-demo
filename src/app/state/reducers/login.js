// @flow

import * as Actions from '../actions/ActionType'
import initialState from '../InitialState'
import {Reducer, Action} from 'redux'

const login: Reducer<boolean> = function (state: ?boolean = initialState.login, action: Action) {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            return true;
        case Actions.LOGIN_FAILURE:
            return false;
        case Actions.LOGIN_RESET:
            return null;
        case Actions.LOGIN_LOGOUT:
            return null;
        default:
            return state;
    }
}

export default login