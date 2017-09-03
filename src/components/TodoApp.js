import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import './TodoApp.css'

class TodoApp extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  componentWillMount() {
    this.props.store.subscribe(() => this.forceUpdate())
  }

  render() {
    return (
      <div className="todo-list-main">
        <AddTodo/>
        <TodoList/>
      </div>
    )
  }
}

export default TodoApp
