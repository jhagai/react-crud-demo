import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-widgets/dist/css/react-widgets.css'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'

momentLocalizer(Moment);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// Are we in development mode?
if (module.hot) {
    // Whenever a new version of App.js is available
    module.hot.accept('./App', function () {
        // Require the new version and render it instead
        var NextApp = require('./App')
        ReactDOM.render(<NextApp />, document.getElementById('root'))
    })
}