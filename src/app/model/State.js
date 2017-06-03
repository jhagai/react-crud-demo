// @flow

import type {People} from "./people/People";

class State {
    login: ?boolean = null;
    people: People = {
        success: null
        , error: null
    };
    create: {showErrorPopup:boolean, showSuccessPopup:boolean} = {
        showErrorPopup: false,
        showSuccessPopup: false
    };
}

export default State