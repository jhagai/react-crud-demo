// @flow

import type {People} from "./people/People";

class State {
    login:?boolean = null;
    people: People = {
        success: null
        , error: null
    };
}

export default State