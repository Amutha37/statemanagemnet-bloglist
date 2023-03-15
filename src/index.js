import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )
