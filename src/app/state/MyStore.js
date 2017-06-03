import {compose, createStore, combineReducers} from 'redux'
import * as reducers from './reducers'
import {reducer as formReducer} from 'redux-form'
import {persistStore, autoRehydrate} from 'redux-persist'

export default function configureStore() {

    let combinedReducers = combineReducers({...reducers, form: formReducer});

    const store = createStore(combinedReducers,
        //initialState,
        compose(
            autoRehydrate(),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    persistStore(store);

    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default)
        );
    }

    return store;
}