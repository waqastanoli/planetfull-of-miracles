import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { renderRoutes } from './routes';
import { hot } from 'react-hot-loader';
import ScrollToTop from './routes/ScrollToTop'

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
    <ScrollToTop>
      { renderRoutes() }
      </ScrollToTop>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default hot(module)(App);