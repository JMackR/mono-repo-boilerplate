import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

// import * as serviceWorker from './serviceWorker';
import theme from './theme'
import store from './app/store'
import './index.scss'

import 'overlayscrollbars/css/OverlayScrollbars.css'
import './styles/entry.scss'

const render = () => {
  const App = require('./app/App').default
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render)
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()

