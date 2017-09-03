import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './components/TodoApp'
import store from './store'

ReactDOM.render(
  <TodoApp store={store}/>,
  document.getElementById('app')
)
