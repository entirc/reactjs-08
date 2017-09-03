import React, { Component } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import './TodoApp.css'

class TodoApp extends Component {
  componentWillMount() {
    this.props.store.subscribe(() => this.forceUpdate())
  }

  render() {
    const store = this.props.store
    return (
      <div className="todo-list-main">
        <AddTodo store={store} />
        <TodoList store={store} />
      </div>
    )
  }
}

export default TodoApp
