// @flow

import * as Actions from '../actions/ActionType'
import initialState from '../InitialState'
import {Reducer, Action} from 'redux'

const create: Reducer<boolean> = function (state: typeof initialState.create = initialState.create, action: Action) {
    switch (action.type) {
        case Actions.CREATE_ERROR_POPUP_SHOW:
            return {...state, showErrorPopup: true};
        case Actions.CREATE_ERROR_POPUP_HIDE:
            return {...state, showErrorPopup: false};
        case Actions.CREATE_SUCCESS_POPUP_SHOW:
            return {...state, showSuccessPopup: true};
        case Actions.CREATE_SUCCESS_POPUP_HIDE:
            return {...state, showSuccessPopup: false};
        default:
            return state;
    }
}

export default create